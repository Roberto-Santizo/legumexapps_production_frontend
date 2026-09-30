import { ApiResponseSchema, setQueryParams } from "@/features/shared/shared";
import { isAxiosError, type AxiosInstance } from "axios";
import { PositionSchema, PaginatedPositionsSchema, type PositionDatasource, type Position, type PositionForm, type PaginatedPositions, type PositionFilters } from "@/features/positions/positions";

export class PositionDatasourceImpl implements PositionDatasource {
    constructor(private api: AxiosInstance, private url = '/positions') { }

    async createPosition(payload: PositionForm): Promise<string> {
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

    async getPositions(limit: string, page: string, lineCode: string, filters?: PositionFilters): Promise<PaginatedPositions> {
        try {
            const params = setQueryParams({ limit, page, lineCode, ...filters });
            const url = `${this.url}?${params.toString()}`;
            const { data } = await this.api.get(url);
            const response = PaginatedPositionsSchema.safeParse(data);

            if (response.success) {
                return response.data;
            }

            throw new Error("Error no controlado");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async getPositionById(id: string): Promise<Position> {
        try {
            const url = `${this.url}/${id}`;
            const { data } = await this.api.get(url);
            const response = PositionSchema.safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async updatePositionById(id: string, payload: PositionForm): Promise<string> {
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

    async deletePositionById(id: string): Promise<string> {
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

    async uploadFile(file: File): Promise<string> {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const { data } = await this.api.post(`${this.url}/uploadFile`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
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
