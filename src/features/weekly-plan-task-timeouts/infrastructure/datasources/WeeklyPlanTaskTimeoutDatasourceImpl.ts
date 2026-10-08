import { ApiResponseSchema } from "@/features/shared/shared";
import { isAxiosError, type AxiosInstance } from "axios";
import { WeeklyPlanTaskTimeoutsResponseSchema, type WeeklyPlanTaskTimeout, type WeeklyPlanTaskTimeoutDatasource, type WeeklyPlanTaskTimeoutEndForm, type WeeklyPlanTaskTimeoutForm } from "@/features/weekly-plan-task-timeouts/weekly-plan-task-timeouts";

export class WeeklyPlanTaskTimeoutDatasourceImpl implements WeeklyPlanTaskTimeoutDatasource {
    constructor(private api: AxiosInstance, private url = '/weekly-plan-task-timeouts', private tasksUrl = '/weekly-plan-tasks') { }

    async getWeeklyPlanTaskTimeouts(weeklyPlanTaskId: string): Promise<WeeklyPlanTaskTimeout[]> {
        try {
            const url = `${this.tasksUrl}/${weeklyPlanTaskId}/timeouts`;
            const { data } = await this.api.get(url);
            const response = WeeklyPlanTaskTimeoutsResponseSchema.safeParse(data);

            if (response.success) {
                return response.data.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async startWeeklyPlanTaskTimeout(weeklyPlanTaskId: string, payload: WeeklyPlanTaskTimeoutForm): Promise<string> {
        try {
            const url = `${this.tasksUrl}/${weeklyPlanTaskId}/startTimeout`;
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

    async endWeeklyPlanTaskTimeout(id: string, payload: WeeklyPlanTaskTimeoutEndForm): Promise<string> {
        try {
            const url = `${this.url}/${id}/end`;
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

    async updateWeeklyPlanTaskTimeoutById(id: string, payload: WeeklyPlanTaskTimeoutForm): Promise<string> {
        try {
            const url = `${this.url}/${id}`;
            const { data } = await this.api.patch(url, payload);
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

    async deleteWeeklyPlanTaskTimeoutById(id: string): Promise<string> {
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
