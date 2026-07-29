import { ApiResponseSchema } from "@/features/shared/shared";
import { isAxiosError, type AxiosInstance } from "axios";
import { SkuPackingMaterialSchema, PaginatedSkuPackingMaterialsSchema, type SkuPackingMaterialDatasource, type SkuPackingMaterial, type SkuPackingMaterialForm, type PaginatedSkuPackingMaterials } from "@/features/sku-packing-materials/sku-packing-materials";

export class SkuPackingMaterialDatasourceImpl implements SkuPackingMaterialDatasource {
    constructor(private api: AxiosInstance, private url = '/sku-packing-materials') { }

    async createSkuPackingMaterial(payload: SkuPackingMaterialForm): Promise<string> {
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

    async getSkuPackingMaterials(skuCode:string, limit: string, page: string): Promise<PaginatedSkuPackingMaterials> {
        try {
            const url = `${this.url}?skuId=${skuCode}&limit=${limit}&page=${page}`;
            const { data } = await this.api.get(url);
            const response = PaginatedSkuPackingMaterialsSchema.safeParse(data);

            if (response.success) {
                return response.data;
            }

            throw new Error("Error no controlado");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async getSkuPackingMaterialById(id: string): Promise<SkuPackingMaterial> {
        try {
            const url = `${this.url}/${id}`;
            const { data } = await this.api.get(url);
            const response = SkuPackingMaterialSchema.safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async updateSkuPackingMaterialById(id: string, payload: SkuPackingMaterialForm): Promise<string> {
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

    async deleteSkuPackingMaterialById(id: string): Promise<string> {
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
