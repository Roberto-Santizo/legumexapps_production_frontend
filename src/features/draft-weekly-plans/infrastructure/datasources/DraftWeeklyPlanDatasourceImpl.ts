import { ApiResponseSchema, BarChartDatumSchema, type BarChartDatum } from "@/features/shared/shared";
import { isAxiosError, type AxiosInstance } from "axios";
import { DraftWeeklyPlanSchema, PaginatedDraftWeeklyPlansSchema, type DraftWeeklyPlan, type DraftWeeklyPlanDatasource, type DraftWeeklyPlanForm, type PaginatedDraftWeeklyPlans } from "@/features/draft-weekly-plans/draft-weekly-plans";
import { z } from "zod";

export class DraftWeeklyPlanDatasourceImpl implements DraftWeeklyPlanDatasource {
    constructor(private api: AxiosInstance, private url = '/draft-weekly-plans') { }

    async getHoursPerLineByDraftWeeklyPlanId(id: string): Promise<BarChartDatum[]> {
        try {
            const url = `${this.url}/${id}/hoursPerLine`;
            const { data } = await this.api.get(url);
            const response = z.array(BarChartDatumSchema).safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async createDraftWeeklyPlan(payload: DraftWeeklyPlanForm): Promise<string> {
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

    async getDraftWeeklyPlans(limit: string, page: string): Promise<PaginatedDraftWeeklyPlans> {
        try {
            const url = `${this.url}?limit=${limit}&page=${page}`;
            const { data } = await this.api.get(url);
            const response = PaginatedDraftWeeklyPlansSchema.safeParse(data);

            if (response.success) {
                return response.data;
            }

            throw new Error("Error no controlado");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async getDraftWeeklyPlanById(id: string): Promise<DraftWeeklyPlan> {
        try {
            const url = `${this.url}/${id}`;
            const { data } = await this.api.get(url);
            const response = DraftWeeklyPlanSchema.safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async updateDraftWeeklyPlanById(id: string, payload: DraftWeeklyPlanForm): Promise<string> {
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

    async deleteDraftWeeklyPlanById(id: string): Promise<string> {
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
