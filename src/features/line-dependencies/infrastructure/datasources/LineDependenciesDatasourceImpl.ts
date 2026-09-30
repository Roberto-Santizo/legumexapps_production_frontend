import { ApiResponseSchema } from "@/features/shared/shared";
import { isAxiosError, type AxiosInstance } from "axios";
import { LineDependencySchema, type LineDependancy, type LineDependenciesDatasource, type LineDependencyForm } from "@/features/line-dependencies/line-dependencies";
import z from 'zod';

export class LineDependenciesDatasourceImpl implements LineDependenciesDatasource {
    constructor(private api: AxiosInstance, private url = '/line-dependencies') { }

    async createLineDependency(payload: LineDependencyForm): Promise<string> {
        try {
            const { data } = await this.api.post(this.url, payload);
            const response = ApiResponseSchema.safeParse(data);

            if (response.success) {
                return response.data.message;
            }

            throw new Error('Información no válida.');
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async getLineDependencies(lineId: string): Promise<LineDependancy[]> {
        try {
            const url = `${this.url}?lineId=${lineId}`
            const { data } = await this.api.get(url);
            const response = z.array(LineDependencySchema).safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error('Información no válida.');
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async deleteLineDependencyById(id: string): Promise<string> {
        try {
            const url = `${this.url}/${id}`
            const { data } = await this.api.delete(url);
            const response = ApiResponseSchema.safeParse(data);

            if (response.success) {
                return response.data.message;
            }

            throw new Error('Información no válida.');
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

} 