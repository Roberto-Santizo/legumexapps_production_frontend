import { isAxiosError, type AxiosInstance } from "axios";
import { UploadWeeklyPlanEmployeesResponseSchema, type UploadWeeklyPlanEmployeesResponse, type WeeklyPlanEmployeeDatasource } from "@/features/weekly-plan-employees/weekly-plan-employees";

export class WeeklyPlanEmployeeDatasourceImpl implements WeeklyPlanEmployeeDatasource {
    constructor(private api: AxiosInstance, private url = '/weekly-plan-employees') { }

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
