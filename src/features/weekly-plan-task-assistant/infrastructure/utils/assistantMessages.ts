import type { UIMessage } from "ai";
import type { AssistantConversationMessage } from "@/features/weekly-plan-task-assistant/weekly-plan-task-assistant";

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
