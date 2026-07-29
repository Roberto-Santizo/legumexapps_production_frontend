import { ApiResponseSchema } from "@/features/shared/shared";
import { isAxiosError, type AxiosInstance } from "axios";
import { PerformanceSchema, PaginatedPerformancesSchema, type PerformanceDatasource, type Performance, type PerformanceForm, type PaginatedPerformances, type PerformanceFilters } from "@/features/performances/performances";

export class PerformanceDatasourceImpl implements PerformanceDatasource {
    constructor(private api: AxiosInstance, private url = '/performances') { }

    async createPerformance(payload: PerformanceForm): Promise<string> {
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

    async getPerformances(limit: string, page: string, filters?: PerformanceFilters): Promise<PaginatedPerformances> {
        try {
            const params = new URLSearchParams({ limit, page });

            Object.entries(filters ?? {}).forEach(([key, value]) => {
                if (value) params.append(key, value);
            });

            const url = `${this.url}?${params.toString()}`;
            const { data } = await this.api.get(url);
            const response = PaginatedPerformancesSchema.safeParse(data);

            if (response.success) {
                return response.data;
            }

            throw new Error("Error no controlado");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async getPerformanceById(id: string): Promise<Performance> {
        try {
            const url = `${this.url}/${id}`;
            const { data } = await this.api.get(url);
            const response = PerformanceSchema.safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async updatePerformanceById(id: string, payload: PerformanceForm): Promise<string> {
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

    async deletePerformanceById(id: string): Promise<string> {
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
