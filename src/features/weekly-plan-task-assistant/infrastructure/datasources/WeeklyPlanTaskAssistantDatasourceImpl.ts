import { ApiResponseSchema, setQueryParams } from "@/features/shared/shared";
import { isAxiosError, type AxiosInstance } from "axios";
import { AssistantConversationMessagesResponseSchema, PaginatedAssistantConversationsSchema, type AssistantConversationMessage, type PaginatedAssistantConversations, type WeeklyPlanTaskAssistantDatasource } from "@/features/weekly-plan-task-assistant/weekly-plan-task-assistant";

export class WeeklyPlanTaskAssistantDatasourceImpl implements WeeklyPlanTaskAssistantDatasource {
    constructor(private api: AxiosInstance, private url = '/weekly-plan-task-assistant') { }

    async getConversations(limit: string, page: string): Promise<PaginatedAssistantConversations> {
        try {
            const params = setQueryParams({ limit, page });
            const { data } = await this.api.get(`${this.url}/conversations?${params.toString()}`);
            const response = PaginatedAssistantConversationsSchema.safeParse(data);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message, { cause: error });

            throw new Error("Error no controlado", { cause: error });
        }
    }

    async getConversationMessages(id: string): Promise<AssistantConversationMessage[]> {
        try {
            const { data } = await this.api.get(`${this.url}/conversations/${id}/messages`);
            const response = AssistantConversationMessagesResponseSchema.safeParse(data);

            if (response.success) {
                return response.data.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message, { cause: error });

            throw new Error("Error no controlado", { cause: error });
        }
    }

    async deleteConversation(id: string): Promise<string> {
        try {
            const { data } = await this.api.delete(`${this.url}/conversations/${id}`);
            const response = ApiResponseSchema.safeParse(data);

            if (response.success) {
                return response.data.message;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message, { cause: error });

            throw new Error("Error no controlado", { cause: error });
        }
    }
}
