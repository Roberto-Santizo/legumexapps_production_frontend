import { ApiResponseSchema } from "@/features/shared/shared";
import { isAxiosError, type AxiosInstance } from "axios";
import { WeeklyPlanTaskSchema, PaginatedWeeklyPlanTasksSchema, type WeeklyPlanTaskDatasource, type WeeklyPlanTask, type WeeklyPlanTaskCreateForm, type WeeklyPlanTaskUpdateForm, type PaginatedWeeklyPlanTasks, type AssignOperationDateForm, type SplitWeeklyPlanTaskForm, type WeeklyPlanTaskPackingMaterialItem, WeeklyPlanTaskPackingMaterialItemSchema } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { z } from "zod";

export class WeeklyPlanTaskDatasourceImpl implements WeeklyPlanTaskDatasource {
    constructor(private api: AxiosInstance, private url = '/weekly-plan-tasks') { }

    async getPackingMaterialItemsByTaskId(id: string): Promise<WeeklyPlanTaskPackingMaterialItem[]> {
        try {
            const url = `${this.url}/${id}/packingMaterialItems`
            const { data } = await this.api.get(url);
            const response = z.array(WeeklyPlanTaskPackingMaterialItemSchema).safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async assignOperationDateToTasks(payload: AssignOperationDateForm): Promise<string> {
        try {
            const url = `${this.url}/assignOperationDate`
            const { data } = await this.api.post(url, payload);
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

    async splitWeeklyPlanTask(payload: SplitWeeklyPlanTaskForm): Promise<string> {
        try {
            const url = `${this.url}/splitTask`
            const { data } = await this.api.post(url, payload);
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

    async createWeeklyPlanTask(payload: WeeklyPlanTaskCreateForm): Promise<string> {
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

    async getWeeklyPlanTasks(weeklyPlanId: string, flagOperationDate: string, operationDate: string, limit: string, page: string): Promise<PaginatedWeeklyPlanTasks> {
        try {
            const url = `${this.url}?weeklyPlanId=${weeklyPlanId}&limit=${limit}&page=${page}&noOperationDate=${flagOperationDate}&operationDate=${operationDate}`;
            const { data } = await this.api.get(url);
            const response = PaginatedWeeklyPlanTasksSchema.safeParse(data);

            if (response.success) {
                return response.data;
            }

            throw new Error("Error no controlado");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async getWeeklyPlanTaskById(id: string): Promise<WeeklyPlanTask> {
        try {
            const url = `${this.url}/${id}`;
            const { data } = await this.api.get(url);
            const response = WeeklyPlanTaskSchema.safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async updateWeeklyPlanTaskById(id: string, payload: WeeklyPlanTaskUpdateForm): Promise<string> {
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

    async deleteWeeklyPlanTaskById(id: string): Promise<string> {
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
