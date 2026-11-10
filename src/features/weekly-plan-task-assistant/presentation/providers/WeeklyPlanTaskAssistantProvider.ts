import { type AssistantConversationMessage, type PaginatedAssistantConversations, type WeeklyPlanTaskAssistantRepository } from "@/features/weekly-plan-task-assistant/weekly-plan-task-assistant";
import { WeeklyPlanTaskAssistantDatasourceImpl, WeeklyPlanTaskAssistantRepositoryImpl } from "@/features/weekly-plan-task-assistant/infrastructure/infrastructure";
import api from "@/config/http/axios";

export class WeeklyPlanTaskAssistantProvider {
    constructor(private repository: WeeklyPlanTaskAssistantRepository) { }

    getConversations(limit: string, page: string): Promise<PaginatedAssistantConversations> {
        return this.repository.getConversations(limit, page);
    }

    getConversationMessages(id: string): Promise<AssistantConversationMessage[]> {
        return this.repository.getConversationMessages(id);
    }

    deleteConversation(id: string): Promise<string> {
        return this.repository.deleteConversation(id);
    }
}

const datasource = new WeeklyPlanTaskAssistantDatasourceImpl(api);
const repository = new WeeklyPlanTaskAssistantRepositoryImpl(datasource);
export const weeklyPlanTaskAssistantProvider = new WeeklyPlanTaskAssistantProvider(repository);
