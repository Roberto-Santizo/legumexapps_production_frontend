import { ApiResponseSchema } from "@/features/shared/shared";
import { isAxiosError, type AxiosInstance } from "axios";
import { toPerformanceRecordError, type PerformanceRecordErrorResponse } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { WeeklyPlanTaskLotRecordSchema, WeeklyPlanTaskLotRecordsResponseSchema, type WeeklyPlanTaskLotRecord, type WeeklyPlanTaskLotRecordCreateForm, type WeeklyPlanTaskLotRecordDatasource, type WeeklyPlanTaskLotRecordForm } from "@/features/weekly-plan-task-lot-records/weekly-plan-task-lot-records";

export class WeeklyPlanTaskLotRecordDatasourceImpl implements WeeklyPlanTaskLotRecordDatasource {
    constructor(private api: AxiosInstance, private url = '/weekly-plan-task-lot-records') { }

    async createWeeklyPlanTaskLotRecord(payload: WeeklyPlanTaskLotRecordCreateForm): Promise<string> {
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

    async getWeeklyPlanTaskLotRecords(weeklyPlanTaskId: string): Promise<WeeklyPlanTaskLotRecord[]> {
        try {
            const url = `${this.url}?weeklyPlanTaskId=${weeklyPlanTaskId}`;
            const { data } = await this.api.get(url);
            const response = WeeklyPlanTaskLotRecordsResponseSchema.safeParse(data);

            if (response.success) {
                return response.data.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async getWeeklyPlanTaskLotRecordById(id: string): Promise<WeeklyPlanTaskLotRecord> {
        try {
            const url = `${this.url}/${id}`;
            const { data } = await this.api.get(url);
            const response = WeeklyPlanTaskLotRecordSchema.safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async updateWeeklyPlanTaskLotRecordById(id: string, payload: WeeklyPlanTaskLotRecordForm): Promise<string> {
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

    async deleteWeeklyPlanTaskLotRecordById(id: string): Promise<string> {
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
