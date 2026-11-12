import { ApiResponseSchema, setQueryParams } from "@/features/shared/shared";
import { isAxiosError, type AxiosInstance } from "axios";
import { ActivitySchema, PaginatedActivitiesSchema, type Activity, type ActivityDatasource, type ActivityFilters, type ActivityForm, type PaginatedActivities, type UpdateActivityPayload } from "@/features/activities/activities";

export class ActivityDatasourceImpl implements ActivityDatasource {
    constructor(private api: AxiosInstance, private url = '/activities') { }

    async createActivity(payload: ActivityForm): Promise<string> {
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

    async getActivities(limit: string, page: string, filters?: Partial<ActivityFilters>): Promise<PaginatedActivities> {
        try {
            const params = setQueryParams({ limit, page: limit ? page : '', ...filters });
            const url = `${this.url}?${params.toString()}`;
            const { data } = await this.api.get(url);
            const response = PaginatedActivitiesSchema.safeParse(data);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async getActivityById(id: string): Promise<Activity> {
        try {
            const url = `${this.url}/${id}`;
            const { data } = await this.api.get(url);
            const response = ActivitySchema.safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async updateActivityById(id: string, payload: UpdateActivityPayload): Promise<string> {
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

    async deleteActivityById(id: string): Promise<string> {
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
