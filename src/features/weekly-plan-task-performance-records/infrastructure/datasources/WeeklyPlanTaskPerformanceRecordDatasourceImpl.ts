import { ApiResponseSchema } from "@/features/shared/shared";
import { isAxiosError, type AxiosInstance } from "axios";
import { WeeklyPlanTaskPerformanceRecordSchema, WeeklyPlanTaskPerformanceRecordsResponseSchema, type WeeklyPlanTaskPerformanceRecord, type WeeklyPlanTaskPerformanceRecordCreateForm, type WeeklyPlanTaskPerformanceRecordDatasource, type WeeklyPlanTaskPerformanceRecordForm, type PerformanceRecordErrorResponse, toPerformanceRecordError } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

export class WeeklyPlanTaskPerformanceRecordDatasourceImpl implements WeeklyPlanTaskPerformanceRecordDatasource {
    constructor(private api: AxiosInstance, private url = '/weekly-plan-task-performance-records') { }

    async createWeeklyPlanTaskPerformanceRecord(payload: WeeklyPlanTaskPerformanceRecordCreateForm): Promise<string> {
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

    async getWeeklyPlanTaskPerformanceRecords(weeklyPlanTaskId: string): Promise<WeeklyPlanTaskPerformanceRecord[]> {
        try {
            const url = `${this.url}?weeklyPlanTaskId=${weeklyPlanTaskId}`;
            const { data } = await this.api.get(url);
            const response = WeeklyPlanTaskPerformanceRecordsResponseSchema.safeParse(data);

            if (response.success) {
                return response.data.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async getWeeklyPlanTaskPerformanceRecordById(id: string): Promise<WeeklyPlanTaskPerformanceRecord> {
        try {
            const url = `${this.url}/${id}`;
            const { data } = await this.api.get(url);
            const response = WeeklyPlanTaskPerformanceRecordSchema.safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async updateWeeklyPlanTaskPerformanceRecordById(id: string, payload: WeeklyPlanTaskPerformanceRecordForm): Promise<string> {
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

    async deleteWeeklyPlanTaskPerformanceRecordById(id: string): Promise<string> {
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
