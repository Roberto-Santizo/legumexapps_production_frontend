import { ApiResponseSchema } from "@/features/shared/shared";
import { isAxiosError, type AxiosInstance } from "axios";
import { RawMaterialItemSchema, PaginatedRawMaterialItemsSchema, type RawMaterialDatasource, type RawMaterialItem, type RawMaterialItemForm, type PaginatedRawMaterialItems } from "@/features/raw-materials/raw-materials";

export class RawMaterialDatasourceImpl implements RawMaterialDatasource {
    constructor(private api: AxiosInstance, private url = '/raw-materials') { }

    async createRawMaterialItem(payload: RawMaterialItemForm): Promise<string> {
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

    async getRawMaterialItems(limit: string, page: string): Promise<PaginatedRawMaterialItems> {
        try {
            const url = `${this.url}?limit=${limit}&page=${page}`;
            const { data } = await this.api.get(url);
            const response = PaginatedRawMaterialItemsSchema.safeParse(data);

            if (response.success) {
                return response.data;
            }

            throw new Error("Error no controlado");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async getRawMaterialItemByCode(code: string): Promise<RawMaterialItem> {
        try {
            const url = `${this.url}/${code}`;
            const { data } = await this.api.get(url);
            const response = RawMaterialItemSchema.safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async updateRawMaterialItemByCode(code: string, payload: RawMaterialItemForm): Promise<string> {
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

    async deleteRawMaterialItemByCode(code: string): Promise<string> {
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
