import { ApiResponseSchema } from "@/features/shared/shared";
import { isAxiosError, type AxiosInstance } from "axios";
import { LineFieldSchema, type AssignLineFieldPayload, type LineField, type LineFieldsDatasource, type UpdateLineFieldPayload } from "@/features/line-fields/line-fields";
import { z } from "zod";

export class LineFieldsDatasourceImpl implements LineFieldsDatasource {
    constructor(private api: AxiosInstance, private url = '/line-fields', private linesUrl = '/lines') { }

    async getLineFields(lineCode: string): Promise<LineField[]> {
        try {
            const url = `${this.linesUrl}/${lineCode}/fields`;
            const { data } = await this.api.get(url);
            const response = z.array(LineFieldSchema).safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async assignLineField(lineCode: string, payload: AssignLineFieldPayload): Promise<string> {
        try {
            const url = `${this.linesUrl}/${lineCode}/fields`;
            const { data } = await this.api.post(url, payload);
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

    async updateLineFieldById(id: string, payload: UpdateLineFieldPayload): Promise<string> {
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

    async deleteLineFieldById(id: string): Promise<string> {
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
