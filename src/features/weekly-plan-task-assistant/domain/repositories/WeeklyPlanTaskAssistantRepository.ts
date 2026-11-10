import type { AssistantConversationMessage, PaginatedAssistantConversations } from "@/features/weekly-plan-task-assistant/weekly-plan-task-assistant";

export abstract class WeeklyPlanTaskAssistantRepository {
    abstract getConversations(limit: string, page: string): Promise<PaginatedAssistantConversations>;
    abstract getConversationMessages(id: string): Promise<AssistantConversationMessage[]>;
    abstract deleteConversation(id: string): Promise<string>;
}
