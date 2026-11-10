import type { QueryClient } from "@tanstack/react-query";
import type { AssistantConversation, PaginatedAssistantConversations } from "@/features/weekly-plan-task-assistant/weekly-plan-task-assistant";

export const ASSISTANT_QUERY_KEY = 'weeklyPlanTaskAssistant';
export const ASSISTANT_CONVERSATIONS_LIMIT = '20';
export const ASSISTANT_MESSAGE_MAX_LENGTH = 2000;
export const ASSISTANT_CONVERSATION_PARAM = 'conversacion';

export const assistantConversationsQueryKey = [ASSISTANT_QUERY_KEY, 'conversations'];

export const assistantMessagesQueryKey = (id: string) => [ASSISTANT_QUERY_KEY, 'messages', id];

export const flattenConversationPages = (pages: PaginatedAssistantConversations[] = []): AssistantConversation[] => {
    return pages.flatMap((page) => page.data);
}

export const getNextConversationsPage = (page: PaginatedAssistantConversations): number | undefined => {
    const current = page.currentPage ?? 1;
    const last = page.lastPage ?? current;

    return current < last ? current + 1 : undefined;
}

export const clearAssistantCache = (queryClient: QueryClient) => {
    queryClient.removeQueries({ queryKey: [ASSISTANT_QUERY_KEY] });
}
