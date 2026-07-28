import { ApiResponseSchema } from "@/features/shared/shared";
import { isAxiosError, type AxiosInstance } from "axios";
import { SkuSchema, PaginatedSkusSchema, type SkuDatasource, type Sku, type SkuForm, type PaginatedSkus } from "@/features/skus/skus";

export class SkuDatasourceImpl implements SkuDatasource {
    constructor(private api: AxiosInstance, private url = '/skus') { }

    async createSku(payload: SkuForm): Promise<string> {
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

    async getSkus(limit: string, page: string): Promise<PaginatedSkus> {
        try {
            const url = `${this.url}?limit=${limit}&page=${page}`;
            const { data } = await this.api.get(url);
            const response = PaginatedSkusSchema.safeParse(data);

            if (response.success) {
                return response.data;
            }

            throw new Error("Error no controlado");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async getSkuByCode(code: string): Promise<Sku> {
        try {
            const url = `${this.url}/${code}`;
            const { data } = await this.api.get(url);
            const response = SkuSchema.safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async updateSkuByCode(code: string, payload: SkuForm): Promise<string> {
        try {
            const url = `${this.url}/${code}`;
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

    async deleteSkuByCode(code: string): Promise<string> {
        try {
            const url = `${this.url}/${code}`;
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
