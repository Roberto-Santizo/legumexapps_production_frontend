import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { createAssistantTransport, type AssistantChatSession } from "@/features/weekly-plan-task-assistant/weekly-plan-task-assistant";

type Options = {
    session: AssistantChatSession;
    onConversationId?: (id: string) => void;
    onFinish?: () => void;
};

export function useWeeklyPlanTaskAssistantChat({ session, onConversationId, onFinish }: Options) {
    const [transport] = useState(() => {
        let conversationId = session.conversationId;

        return createAssistantTransport({
            getConversationId: () => conversationId,
            onConversationId: (id) => {
                if (conversationId === id) return;

                conversationId = id;
                onConversationId?.(id);
            }
        });
    });

    return useChat({
        transport,
        messages: session.messages,
        onFinish: () => onFinish?.()
    });
}
