import { ApiResponseSchema } from "@/features/shared/shared";
import { isAxiosError, type AxiosInstance } from "axios";
import { LineSchema, PaginatedLinesSchema, type Line, type LineForm, type LinesDatasource, type PaginatedLines } from "@/features/lines/lines";

export class LinesDatasourceImpl implements LinesDatasource {
    constructor(private api: AxiosInstance, private url = '/lines') { }

    async createLine(payload: LineForm): Promise<string> {
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

    async getLines(limit: string, page: string, skuId?: string): Promise<PaginatedLines> {
        try {
            const url = `${this.url}?limit=${limit}&page=${page}&skuId=${skuId}`
            const { data } = await this.api.get(url);
            const response = PaginatedLinesSchema.safeParse(data);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async getLineByCode(code: string): Promise<Line> {
        try {
            const url = `${this.url}/${code}`
            const { data } = await this.api.get(url);
            const response = LineSchema.safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async updateLineByCode(code: string, payload: LineForm): Promise<string> {
        try {
            const url = `${this.url}/${code}`
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

    deleteLineByCode(_: string): Promise<string> {
        throw new Error('Method not implemented.');
    }

}