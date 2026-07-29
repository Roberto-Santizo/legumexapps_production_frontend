import { ApiResponseSchema } from "@/features/shared/shared";
import { isAxiosError, type AxiosInstance } from "axios";
import { DraftWeeklyPlanTaskSchema, PaginatedDraftWeeklyPlanTasksSchema, type DraftWeeklyPlanTaskDatasource, type DraftWeeklyPlanTask, type DraftWeeklyPlanTaskForm, type PaginatedDraftWeeklyPlanTasks } from "@/features/draft-weekly-plan-tasks/draft-weekly-plan-tasks";

export class DraftWeeklyPlanTaskDatasourceImpl implements DraftWeeklyPlanTaskDatasource {
    constructor(private api: AxiosInstance, private url = '/draft-weekly-plan-tasks') { }

    async createDraftWeeklyPlanTask(payload: DraftWeeklyPlanTaskForm): Promise<string> {
        try {
            const { data } = await this.api.post(this.url, payload);
            const response = ApiResponseSchema.safeParse(data);

            if (response.success) {
                return response.data.message;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async getDraftWeeklyPlanTasks(draftWeeklyPlanId: string, limit: string, page: string): Promise<PaginatedDraftWeeklyPlanTasks> {
        try {
            const url = `${this.url}?draftWeeklyPlanId=${draftWeeklyPlanId}&limit=${limit}&page=${page}`;
            const { data } = await this.api.get(url);
            const response = PaginatedDraftWeeklyPlanTasksSchema.safeParse(data);

            if (response.success) {
                return response.data;
            }

            throw new Error("Error no controlado");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async getDraftWeeklyPlanTaskById(id: string): Promise<DraftWeeklyPlanTask> {
        try {
            const url = `${this.url}/${id}`;
            const { data } = await this.api.get(url);
            const response = DraftWeeklyPlanTaskSchema.safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async updateDraftWeeklyPlanTaskById(id: string, payload: DraftWeeklyPlanTaskForm): Promise<string> {
        try {
            const url = `${this.url}/${id}`;
            const { data } = await this.api.put(url, payload);
            const response = ApiResponseSchema.safeParse(data);

            if (response.success) {
                return response.data.message;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async deleteDraftWeeklyPlanTaskById(id: string): Promise<string> {
        try {
            const url = `${this.url}/${id}`;
            const { data } = await this.api.delete(url);
            const response = ApiResponseSchema.safeParse(data);

            if (response.success) {
                return response.data.message;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

}
