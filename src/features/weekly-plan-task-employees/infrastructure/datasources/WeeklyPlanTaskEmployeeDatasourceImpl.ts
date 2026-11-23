import { ApiResponseSchema } from "@/features/shared/shared";
import { isAxiosError, type AxiosInstance } from "axios";
import { PreviousEmployeesConfigurationSchema, WeeklyPlanEmployeeSchema, WeeklyPlanTaskEmployeeSchema, type ConfirmWeeklyPlanTaskEmployeesByPositionForm, type ConfirmWeeklyPlanTaskEmployeesForm, type PreviousEmployeesConfiguration, type UpdateWeeklyPlanTaskEmployeeActivityForm, type WeeklyPlanEmployee, type WeeklyPlanTaskEmployee, type WeeklyPlanTaskEmployeeDatasource } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";
import { z } from "zod";

export class WeeklyPlanTaskEmployeeDatasourceImpl implements WeeklyPlanTaskEmployeeDatasource {
    constructor(
        private api: AxiosInstance,
        private url = '/weekly-plan-task-employees',
        private tasksUrl = '/weekly-plan-tasks'
    ) { }

    async getAvailableEmployeesByTaskId(taskId: string): Promise<WeeklyPlanEmployee[]> {
        try {
            const url = `${this.tasksUrl}/${taskId}/availableEmployees`;
            const { data } = await this.api.get(url);
            const response = z.array(WeeklyPlanEmployeeSchema).safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async getEmployeesByTaskId(taskId: string): Promise<WeeklyPlanTaskEmployee[]> {
        try {
            const url = `${this.tasksUrl}/${taskId}/employees`;
            const { data } = await this.api.get(url);
            const response = z.array(WeeklyPlanTaskEmployeeSchema).safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async getLastEmployeesConfigurationByLineCode(lineCode: string): Promise<PreviousEmployeesConfiguration> {
        try {
            const url = `${this.tasksUrl}/lines/${lineCode}/lastEmployeesConfiguration`;
            const { data } = await this.api.get(url);
            const response = PreviousEmployeesConfigurationSchema.safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async confirmEmployeesByTaskId(taskId: string, payload: ConfirmWeeklyPlanTaskEmployeesForm): Promise<string> {
        try {
            const url = `${this.tasksUrl}/${taskId}/confirmEmployees`;
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

    async confirmEmployeesByPositionByTaskId(taskId: string, payload: ConfirmWeeklyPlanTaskEmployeesByPositionForm): Promise<string> {
        try {
            const url = `${this.tasksUrl}/${taskId}/confirmEmployeesByPosition`;
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

    async updateWeeklyPlanTaskEmployeeActivityById(id: string, payload: UpdateWeeklyPlanTaskEmployeeActivityForm): Promise<string> {
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

    async deleteWeeklyPlanTaskEmployeeById(id: string): Promise<string> {
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
