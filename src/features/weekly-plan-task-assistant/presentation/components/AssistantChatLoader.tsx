import { useQuery } from "@tanstack/react-query";
import { AssistantChat, AssistantThinking, assistantMessagesQueryKey, toAssistantUIMessages, weeklyPlanTaskAssistantProvider } from "@/features/weekly-plan-task-assistant/weekly-plan-task-assistant";

type Props = {
    conversationId: string | null;
    onConversationId: (id: string) => void;
    onFinish: () => void;
    onNotFound: () => void;
};

export function AssistantChatLoader({ conversationId, onConversationId, onFinish, onNotFound }: Props) {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: assistantMessagesQueryKey(conversationId ?? ''),
        queryFn: () => weeklyPlanTaskAssistantProvider.getConversationMessages(conversationId!),
        enabled: conversationId !== null,
        retry: false,
        gcTime: 0,
        refetchOnWindowFocus: false
    });

    if (conversationId === null) return (
        <AssistantChat session={{ conversationId: null, messages: [] }} onConversationId={onConversationId} onFinish={onFinish} />
    )

    if (isLoading) return (
        <div className="flex flex-1 items-start justify-center px-6 py-10">
            <AssistantThinking />
        </div>
    )

    if (isError) return (
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-start gap-3 px-6 py-10">
            <p className="text-sm text-ink">{error.message || 'No se pudo abrir la conversación'}</p>
            <button
                type="button"
                onClick={onNotFound}
                className="cursor-pointer rounded-lg border border-line-strong px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-canvas"
            >
                Empezar una conversación nueva
            </button>
        </div>
    )

    if (data) return (
        <AssistantChat
            session={{ conversationId, messages: toAssistantUIMessages(data) }}
            onConversationId={onConversationId}
            onFinish={onFinish}
        />
    )
}
