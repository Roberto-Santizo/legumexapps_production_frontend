import type { ChatStatus, UIMessage } from "ai";
import { getAudioToolSummaries, getToolActivities, type AssistantConversationMessage } from "@/features/weekly-plan-task-assistant/weekly-plan-task-assistant";

export const toAssistantUIMessages = (messages: AssistantConversationMessage[]): UIMessage[] => {
    return messages.map((message) => ({
        id: message.id,
        role: message.role,
        parts: [{ type: 'text', text: message.content }]
    }));
}

export const getMessageText = (message: UIMessage): string => {
    return message.parts.map((part) => (part.type === 'text' ? part.text : '')).join('');
}

export const isAwaitingAssistant = (messages: UIMessage[], status: ChatStatus): boolean => {
    if (status !== 'submitted' && status !== 'streaming') return false;

    const last = messages[messages.length - 1];

    if (!last || last.role === 'user') return true;

    return getMessageText(last).length === 0 && getToolActivities(last).length === 0 && getAudioToolSummaries(last).length === 0;
}
