import { ApiResponseSchema } from "@/features/shared/shared";
import { isAxiosError, type AxiosInstance } from "axios";
import { WeeklyPlanSchema, PaginatedWeeklyPlansSchema, type WeeklyPlanDatasource, type WeeklyPlan, type WeeklyPlanForm, type PaginatedWeeklyPlans, type CalendarEventItem, CalendarEventItemSchema, type WeeklyPlanSummaryByDate, WeeklyPlanSummaryByDateSchema } from "@/features/weekly-plans/weekly-plans";
import z from 'zod';

export class WeeklyPlanDatasourceImpl implements WeeklyPlanDatasource {
    constructor(private api: AxiosInstance, private url = '/weekly-plans') { }

    async getWeeklyPlanSummaryByDate(id: string, date: string): Promise<WeeklyPlanSummaryByDate[]> {
        try {
            const url = `${this.url}/summaryToday/${id}?date=${date}`
            const { data } = await this.api.get(url);
            const response = z.array(WeeklyPlanSummaryByDateSchema).safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async getWeeklyPlanTasksForCalendarById(id: string): Promise<CalendarEventItem[]> {
        try {
            const url = `${this.url}/tasksForCalendar/${id}`
            const { data } = await this.api.get(url);
            const response = z.array(CalendarEventItemSchema).safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async createWeeklyPlan(payload: WeeklyPlanForm): Promise<string> {
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

    async getWeeklyPlans(limit: string, page: string): Promise<PaginatedWeeklyPlans> {
        try {
            const url = `${this.url}?limit=${limit}&page=${page}`;
            const { data } = await this.api.get(url);
            const response = PaginatedWeeklyPlansSchema.safeParse(data);

            if (response.success) {
                return response.data;
            }

            throw new Error("Error no controlado");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async getWeeklyPlanById(id: string): Promise<WeeklyPlan> {
        try {
            const url = `${this.url}/${id}`;
            const { data } = await this.api.get(url);
            const response = WeeklyPlanSchema.safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async updateWeeklyPlanById(id: string, payload: WeeklyPlanForm): Promise<string> {
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

    async deleteWeeklyPlanById(id: string): Promise<string> {
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
