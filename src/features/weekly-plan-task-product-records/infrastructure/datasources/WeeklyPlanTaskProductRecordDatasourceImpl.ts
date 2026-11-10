import { ApiResponseSchema } from "@/features/shared/shared";
import { isAxiosError, type AxiosInstance } from "axios";
import { toPerformanceRecordError, type PerformanceRecordErrorResponse } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { WeeklyPlanTaskProductRecordSchema, WeeklyPlanTaskProductRecordsResponseSchema, type WeeklyPlanTaskProductRecord, type WeeklyPlanTaskProductRecordCreateForm, type WeeklyPlanTaskProductRecordDatasource, type WeeklyPlanTaskProductRecordForm } from "@/features/weekly-plan-task-product-records/weekly-plan-task-product-records";

export class WeeklyPlanTaskProductRecordDatasourceImpl implements WeeklyPlanTaskProductRecordDatasource {
    constructor(private api: AxiosInstance, private url = '/weekly-plan-task-product-records') { }

    async createWeeklyPlanTaskProductRecord(payload: WeeklyPlanTaskProductRecordCreateForm): Promise<string> {
        try {
            const { data } = await this.api.post(this.url, payload);
            const response = ApiResponseSchema.safeParse(data);

            if (response.success) {
                return response.data.message;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError<PerformanceRecordErrorResponse>(error)) throw toPerformanceRecordError(error);

            throw new Error("Error no controlado");
        }
    }

    async getWeeklyPlanTaskProductRecords(weeklyPlanTaskId: string): Promise<WeeklyPlanTaskProductRecord[]> {
        try {
            const url = `${this.url}?weeklyPlanTaskId=${weeklyPlanTaskId}`;
            const { data } = await this.api.get(url);
            const response = WeeklyPlanTaskProductRecordsResponseSchema.safeParse(data);

            if (response.success) {
                return response.data.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async getWeeklyPlanTaskProductRecordById(id: string): Promise<WeeklyPlanTaskProductRecord> {
        try {
            const url = `${this.url}/${id}`;
            const { data } = await this.api.get(url);
            const response = WeeklyPlanTaskProductRecordSchema.safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async updateWeeklyPlanTaskProductRecordById(id: string, payload: WeeklyPlanTaskProductRecordForm): Promise<string> {
        try {
            const url = `${this.url}/${id}`;
            const { data } = await this.api.patch(url, payload);
            const response = ApiResponseSchema.safeParse(data);

            if (response.success) {
                return response.data.message;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError<PerformanceRecordErrorResponse>(error)) throw toPerformanceRecordError(error);

            throw new Error("Error no controlado");
        }
    }

    async deleteWeeklyPlanTaskProductRecordById(id: string): Promise<string> {
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
