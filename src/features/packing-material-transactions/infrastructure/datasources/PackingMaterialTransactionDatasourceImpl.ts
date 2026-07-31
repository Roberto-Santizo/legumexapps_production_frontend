import { ApiResponseSchema } from "@/features/shared/shared";
import { isAxiosError, type AxiosInstance } from "axios";
import { PackingMaterialTransactionSchema, PaginatedPackingMaterialTransactionsSchema, type PackingMaterialTransaction, type PackingMaterialTransactionCreateForm, type PackingMaterialTransactionDatasource, type PackingMaterialTransactionUpdateForm, type PaginatedPackingMaterialTransactions } from "@/features/packing-material-transactions/packing-material-transactions";

export class PackingMaterialTransactionDatasourceImpl implements PackingMaterialTransactionDatasource {
    constructor(private api: AxiosInstance, private url = '/packing-material-transactions') { }

    async createPackingMaterialTransaction(payload: PackingMaterialTransactionCreateForm): Promise<string> {
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

    async getPackingMaterialTransactions(limit: string, page: string): Promise<PaginatedPackingMaterialTransactions> {
        try {
            const url = `${this.url}?limit=${limit}&page=${page}`;
            const { data } = await this.api.get(url);
            const response = PaginatedPackingMaterialTransactionsSchema.safeParse(data);

            if (response.success) {
                return response.data;
            }

            throw new Error("Error no controlado");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async getPackingMaterialTransactionById(id: string): Promise<PackingMaterialTransaction> {
        try {
            const url = `${this.url}/${id}`;
            const { data } = await this.api.get(url);
            const response = PackingMaterialTransactionSchema.safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async updatePackingMaterialTransactionById(id: string, payload: PackingMaterialTransactionUpdateForm): Promise<string> {
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

    async deletePackingMaterialTransactionById(id: string): Promise<string> {
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
