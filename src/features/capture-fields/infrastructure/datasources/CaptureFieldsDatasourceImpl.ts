import { ApiResponseSchema, setQueryParams } from "@/features/shared/shared";
import { isAxiosError, type AxiosInstance } from "axios";
import { CaptureFieldSchema, PaginatedCaptureFieldsSchema, type CaptureField, type CaptureFieldFilters, type CaptureFieldPayload, type CaptureFieldsDatasource, type PaginatedCaptureFields } from "@/features/capture-fields/capture-fields";

export class CaptureFieldsDatasourceImpl implements CaptureFieldsDatasource {
    constructor(private api: AxiosInstance, private url = '/capture-fields') { }

    async createCaptureField(payload: CaptureFieldPayload): Promise<string> {
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

    async getCaptureFields(limit: string, page: string, filters?: Partial<CaptureFieldFilters>): Promise<PaginatedCaptureFields> {
        try {
            const params = setQueryParams({ limit, page: limit ? page : '', ...filters });
            const url = `${this.url}?${params.toString()}`;
            const { data } = await this.api.get(url);
            const response = PaginatedCaptureFieldsSchema.safeParse(data);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async getCaptureFieldById(id: string): Promise<CaptureField> {
        try {
            const url = `${this.url}/${id}`;
            const { data } = await this.api.get(url);
            const response = CaptureFieldSchema.safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async updateCaptureFieldById(id: string, payload: CaptureFieldPayload): Promise<string> {
        try {
            const url = `${this.url}/${id}`;
            const { data } = await this.api.patch(url, payload);
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

    async deleteCaptureFieldById(id: string): Promise<string> {
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
