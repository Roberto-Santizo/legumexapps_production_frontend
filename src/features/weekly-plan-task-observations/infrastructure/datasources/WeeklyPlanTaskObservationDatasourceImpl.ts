import { ApiResponseSchema } from "@/features/shared/shared";
import { isAxiosError, type AxiosInstance } from "axios";
import { WeeklyPlanTaskObservationSchema, PaginatedWeeklyPlanTaskObservationsSchema, type WeeklyPlanTaskObservationDatasource, type WeeklyPlanTaskObservation, type WeeklyPlanTaskObservationForm, type PaginatedWeeklyPlanTaskObservations } from "@/features/weekly-plan-task-observations/weekly-plan-task-observations";

export class WeeklyPlanTaskObservationDatasourceImpl implements WeeklyPlanTaskObservationDatasource {
    constructor(private api: AxiosInstance, private url = '/weekly-plan-task-observations') { }

    async createWeeklyPlanTaskObservation(payload: WeeklyPlanTaskObservationForm): Promise<string> {
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

    async getWeeklyPlanTaskObservations(limit: string, page: string, weeklyPlanTaskId: string): Promise<PaginatedWeeklyPlanTaskObservations> {
        try {
            const url = `${this.url}?limit=${limit}&page=${page}&weeklyPlanTaskId=${weeklyPlanTaskId}`;
            const { data } = await this.api.get(url);
            const response = PaginatedWeeklyPlanTaskObservationsSchema.safeParse(data);

            if (response.success) {
                return response.data;
            }

            throw new Error("Error no controlado");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async getWeeklyPlanTaskObservationById(id: string): Promise<WeeklyPlanTaskObservation> {
        try {
            const url = `${this.url}/${id}`;
            const { data } = await this.api.get(url);
            const response = WeeklyPlanTaskObservationSchema.safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async updateWeeklyPlanTaskObservationById(id: string, payload: WeeklyPlanTaskObservationForm): Promise<string> {
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

    async deleteWeeklyPlanTaskObservationById(id: string): Promise<string> {
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
