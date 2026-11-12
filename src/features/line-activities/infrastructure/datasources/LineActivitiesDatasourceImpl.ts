import { ApiResponseSchema } from "@/features/shared/shared";
import { isAxiosError, type AxiosInstance } from "axios";
import { LineActivitySchema, type AssignLineActivityPayload, type LineActivitiesDatasource, type LineActivity, type UpdateLineActivityPayload } from "@/features/line-activities/line-activities";
import { z } from "zod";

export class LineActivitiesDatasourceImpl implements LineActivitiesDatasource {
    constructor(private api: AxiosInstance, private url = '/line-activities', private linesUrl = '/lines') { }

    async getLineActivities(lineCode: string): Promise<LineActivity[]> {
        try {
            const url = `${this.linesUrl}/${lineCode}/activities`;
            const { data } = await this.api.get(url);
            const response = z.array(LineActivitySchema).safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async assignLineActivity(lineCode: string, payload: AssignLineActivityPayload): Promise<string> {
        try {
            const url = `${this.linesUrl}/${lineCode}/activities`;
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

    async updateLineActivityById(id: string, payload: UpdateLineActivityPayload): Promise<string> {
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

    async deleteLineActivityById(id: string): Promise<string> {
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
