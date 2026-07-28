import { ApiResponseSchema } from "@/features/shared/shared";
import { isAxiosError, type AxiosInstance } from "axios";
import { PackingMaterialItemSchema, PaginatedPackingMaterialItemsSchema, type PackingMaterialDatasource, type PackingMaterialItem, type PackingMaterialItemForm, type PaginatedPackingMaterialItems } from "@/features/packing-materials/packing-materials";

export class PackingMaterialDatasourceImpl implements PackingMaterialDatasource {
    constructor(private api: AxiosInstance, private url = '/packing-materials') { }

    async createPackingMaterialItem(payload: PackingMaterialItemForm): Promise<string> {
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

    async getPackingMaterialItems(limit: string, page: string): Promise<PaginatedPackingMaterialItems> {
        try {
            const url = `${this.url}?limit=${limit}&page=${page}`;
            const { data } = await this.api.get(url);
            const response = PaginatedPackingMaterialItemsSchema.safeParse(data);

            if (response.success) {
                return response.data;
            }

            throw new Error("Error no controlado");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async getPackingMaterialItemByCode(code: string): Promise<PackingMaterialItem> {
        try {
            const url = `${this.url}/${code}`;
            const { data } = await this.api.get(url);
            const response = PackingMaterialItemSchema.safeParse(data['data']);

            console.log(response);
            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async updatePackingMaterialItemByCode(code: string, payload: PackingMaterialItemForm): Promise<string> {
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

    async deletePackingMaterialItemByCode(code: string): Promise<string> {
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