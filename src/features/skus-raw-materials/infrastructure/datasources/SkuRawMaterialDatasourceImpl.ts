import { ApiResponseSchema } from "@/features/shared/shared";
import { isAxiosError, type AxiosInstance } from "axios";
import { SkuRawMaterialSchema, PaginatedSkuRawMaterialsSchema, type SkuRawMaterialDatasource, type SkuRawMaterial, type SkuRawMaterialForm, type PaginatedSkuRawMaterials } from "@/features/skus-raw-materials/skus-raw-materials";

export class SkuRawMaterialDatasourceImpl implements SkuRawMaterialDatasource {
    constructor(private api: AxiosInstance, private url = '/sku-raw-materials') { }

    async createSkuRawMaterial(payload: SkuRawMaterialForm): Promise<string> {
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

    async getSkuRawMaterials(skuId: string, limit: string, page: string): Promise<PaginatedSkuRawMaterials> {
        try {
            const url = `${this.url}?skuId=${skuId}&limit=${limit}&page=${page}`;
            const { data } = await this.api.get(url);
            const response = PaginatedSkuRawMaterialsSchema.safeParse(data);

            if (response.success) {
                return response.data;
            }

            throw new Error("Error no controlado");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async getSkuRawMaterialById(id: string): Promise<SkuRawMaterial> {
        try {
            const url = `${this.url}/${id}`;
            const { data } = await this.api.get(url);
            const response = SkuRawMaterialSchema.safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async updateSkuRawMaterialById(id: string, payload: SkuRawMaterialForm): Promise<string> {
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

    async deleteSkuRawMaterialById(id: string): Promise<string> {
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
