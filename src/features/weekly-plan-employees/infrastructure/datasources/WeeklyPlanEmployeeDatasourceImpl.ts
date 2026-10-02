import { ApiResponseSchema, setQueryParams } from "@/features/shared/shared";
import { isAxiosError, type AxiosInstance } from "axios";
import { PaginatedWeeklyPlanEmployeesSchema, UploadWeeklyPlanEmployeesResponseSchema, WeeklyPlanEmployeeSchema, type PaginatedWeeklyPlanEmployees, type UploadWeeklyPlanEmployeesResponse, type WeeklyPlanEmployee, type WeeklyPlanEmployeeDatasource, type WeeklyPlanEmployeeFilters, type WeeklyPlanEmployeeForm } from "@/features/weekly-plan-employees/weekly-plan-employees";

export class WeeklyPlanEmployeeDatasourceImpl implements WeeklyPlanEmployeeDatasource {
    constructor(private api: AxiosInstance, private url = '/weekly-plan-employees') { }

    async createWeeklyPlanEmployee(payload: WeeklyPlanEmployeeForm): Promise<string> {
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

    async getWeeklyPlanEmployees(limit: string, page: string, filters?: WeeklyPlanEmployeeFilters): Promise<PaginatedWeeklyPlanEmployees> {
        try {
            const params = setQueryParams({ limit, page, ...filters });
            const url = `${this.url}?${params.toString()}`;
            const { data } = await this.api.get(url);
            const response = PaginatedWeeklyPlanEmployeesSchema.safeParse(data);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async getWeeklyPlanEmployeeById(id: string): Promise<WeeklyPlanEmployee> {
        try {
            const url = `${this.url}/${id}`;
            const { data } = await this.api.get(url);
            const response = WeeklyPlanEmployeeSchema.safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async updateWeeklyPlanEmployeeById(id: string, payload: WeeklyPlanEmployeeForm): Promise<string> {
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

    async deleteWeeklyPlanEmployeeById(id: string): Promise<string> {
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

    async uploadFile(file: File): Promise<UploadWeeklyPlanEmployeesResponse> {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const { data } = await this.api.post(`${this.url}/uploadFile`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const response = UploadWeeklyPlanEmployeesResponseSchema.safeParse(data);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }
}
