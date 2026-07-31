import { ApiResponseSchema } from "@/features/shared/shared";
import { isAxiosError, type AxiosInstance } from "axios";
import { PackingMaterialTransactionItemSchema, PaginatedPackingMaterialTransactionItemsSchema, type PackingMaterialTransactionItem, type PackingMaterialTransactionItemDatasource, type PackingMaterialTransactionItemPayload, type PaginatedPackingMaterialTransactionItems } from "@/features/packing-material-transaction-items/packing-material-transaction-items";

export class PackingMaterialTransactionItemDatasourceImpl implements PackingMaterialTransactionItemDatasource {
    constructor(private api: AxiosInstance, private url = '/pm-transaction-items') { }

    async createPackingMaterialTransactionItem(payload: PackingMaterialTransactionItemPayload): Promise<string> {
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

    async getPackingMaterialTransactionItems(limit: string, page: string, transactionId: string): Promise<PaginatedPackingMaterialTransactionItems> {
        try {
            const url = `${this.url}?limit=${limit}&page=${page}&transactionId=${transactionId}`;
            const { data } = await this.api.get(url);
            const response = PaginatedPackingMaterialTransactionItemsSchema.safeParse(data);

            if (response.success) {
                return response.data;
            }

            throw new Error("Error no controlado");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async getPackingMaterialTransactionItemById(id: string): Promise<PackingMaterialTransactionItem> {
        try {
            const url = `${this.url}/${id}`;
            const { data } = await this.api.get(url);
            const response = PackingMaterialTransactionItemSchema.safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async updatePackingMaterialTransactionItemById(id: string, payload: PackingMaterialTransactionItemPayload): Promise<string> {
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

    async deletePackingMaterialTransactionItemById(id: string): Promise<string> {
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
