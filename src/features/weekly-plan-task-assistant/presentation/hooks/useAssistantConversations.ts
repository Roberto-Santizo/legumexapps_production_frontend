import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { ASSISTANT_CONVERSATIONS_LIMIT, assistantConversationsQueryKey, assistantMessagesQueryKey, flattenConversationPages, getNextConversationsPage, weeklyPlanTaskAssistantProvider, type AssistantConversation } from "@/features/weekly-plan-task-assistant/weekly-plan-task-assistant";

type Options = {
    onDeleted: (id: string) => void;
};

export function useAssistantConversations({ onDeleted }: Options) {
    const queryClient = useQueryClient();
    const notification = useNotification();

    const query = useInfiniteQuery({
        queryKey: assistantConversationsQueryKey,
        queryFn: ({ pageParam }) => weeklyPlanTaskAssistantProvider.getConversations(ASSISTANT_CONVERSATIONS_LIMIT, `${pageParam}`),
        initialPageParam: 1,
        getNextPageParam: getNextConversationsPage
    });

    const refresh = () => queryClient.invalidateQueries({ queryKey: assistantConversationsQueryKey });

    const { mutate } = useMutation({
        mutationFn: (id: string) => weeklyPlanTaskAssistantProvider.deleteConversation(id),
        onSuccess: (message, id) => {
            notification.success(message);
            queryClient.removeQueries({ queryKey: assistantMessagesQueryKey(id) });
            onDeleted(id);
            refresh();
        },
        onError: (error) => notification.error(error.message)
    });

    const remove = (conversation: AssistantConversation) => notification.question(
        '¿Desea eliminar la conversación?',
        'Eliminar',
        'Se borrarán la conversación y todos sus mensajes',
        () => mutate(conversation.id)
    );

    return {
        conversations: flattenConversationPages(query.data?.pages),
        isLoading: query.isLoading,
        hasMore: query.hasNextPage,
        isLoadingMore: query.isFetchingNextPage,
        loadMore: () => query.fetchNextPage(),
        refresh,
        remove
    };
}
