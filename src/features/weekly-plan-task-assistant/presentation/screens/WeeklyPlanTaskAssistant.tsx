import { AssistantChatLoader, AssistantConversationList, useAssistantConversations, useAssistantSelection } from "@/features/weekly-plan-task-assistant/weekly-plan-task-assistant";

export function WeeklyPlanTaskAssistant() {
    const { slot, activeId, open, startNew, assignConversationId } = useAssistantSelection();
    const { conversations, isLoading, hasMore, isLoadingMore, loadMore, refresh, remove } = useAssistantConversations({
        onDeleted: (id) => {
            if (id === activeId) startNew();
        }
    });

    const onConversationId = (id: string) => {
        assignConversationId(id);
        refresh();
    }

    return (
        <div className="-mx-8 -my-6 flex h-[calc(100%+3rem)] min-h-[32rem] flex-col md:flex-row">
            <AssistantConversationList
                conversations={conversations}
                activeId={activeId}
                isLoading={isLoading}
                hasMore={hasMore}
                isLoadingMore={isLoadingMore}
                onNew={startNew}
                onSelect={open}
                onDelete={remove}
                onLoadMore={loadMore}
            />

            <AssistantChatLoader
                key={slot.key}
                conversationId={slot.openedId}
                onConversationId={onConversationId}
                onFinish={refresh}
                onNotFound={startNew}
            />
        </div>
    )
}
