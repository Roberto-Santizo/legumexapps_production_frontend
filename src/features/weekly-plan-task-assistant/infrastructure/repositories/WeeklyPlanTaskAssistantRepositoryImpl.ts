import type { AssistantConversationMessage, PaginatedAssistantConversations, WeeklyPlanTaskAssistantDatasource, WeeklyPlanTaskAssistantRepository } from "@/features/weekly-plan-task-assistant/weekly-plan-task-assistant";

export class WeeklyPlanTaskAssistantRepositoryImpl implements WeeklyPlanTaskAssistantRepository {
    constructor(private datasource: WeeklyPlanTaskAssistantDatasource) { }

    getConversations(limit: string, page: string): Promise<PaginatedAssistantConversations> {
        return this.datasource.getConversations(limit, page);
    }

    getConversationMessages(id: string): Promise<AssistantConversationMessage[]> {
        return this.datasource.getConversationMessages(id);
    }

    deleteConversation(id: string): Promise<string> {
        return this.datasource.deleteConversation(id);
    }
}
