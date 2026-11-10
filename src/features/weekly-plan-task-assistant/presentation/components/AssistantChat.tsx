import { AssistantComposer, AssistantEmptyState, AssistantErrorBanner, AssistantMessageList, isAwaitingAssistant, useWeeklyPlanTaskAssistantChat, type AssistantChatSession } from "@/features/weekly-plan-task-assistant/weekly-plan-task-assistant";

type Props = {
    session: AssistantChatSession;
    onConversationId: (id: string) => void;
    onFinish: () => void;
};

export function AssistantChat({ session, onConversationId, onFinish }: Props) {
    const { messages, sendMessage, regenerate, stop, clearError, status, error } = useWeeklyPlanTaskAssistantChat({ session, onConversationId, onFinish });

    const busy = status === 'submitted' || status === 'streaming';
    const send = (text: string) => sendMessage({ text });

    return (
        <section className="flex min-h-0 min-w-0 flex-1 flex-col">
            <div className="min-h-0 flex-1 overflow-y-auto">
                {messages.length === 0
                    ? <AssistantEmptyState onPick={send} disabled={busy} />
                    : <AssistantMessageList messages={messages} thinking={isAwaitingAssistant(messages, status)} />}
            </div>

            {error && <AssistantErrorBanner error={error} onRetry={() => regenerate()} onDismiss={clearError} />}

            <AssistantComposer busy={busy} onSend={send} onStop={stop} />
        </section>
    )
}
