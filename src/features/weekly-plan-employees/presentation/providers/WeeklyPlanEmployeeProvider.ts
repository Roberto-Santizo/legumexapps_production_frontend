import { WeeklyPlanEmployeeDatasourceImpl, WeeklyPlanEmployeeRepositoryImpl } from "@/features/weekly-plan-employees/infrastructure/infrastructure";
import type { PaginatedWeeklyPlanEmployees, UploadWeeklyPlanEmployeesResponse, WeeklyPlanEmployee, WeeklyPlanEmployeeFilters, WeeklyPlanEmployeeForm, WeeklyPlanEmployeeRepository } from "@/features/weekly-plan-employees/weekly-plan-employees";
import api from "@/config/http/axios";

export class WeeklyPlanEmployeeProvider {
    constructor(private repository: WeeklyPlanEmployeeRepository) { }

    createWeeklyPlanEmployee(payload: WeeklyPlanEmployeeForm): Promise<string> {
        return this.repository.createWeeklyPlanEmployee(payload);
    }

    getWeeklyPlanEmployees(limit: string, page: string, filters?: WeeklyPlanEmployeeFilters): Promise<PaginatedWeeklyPlanEmployees> {
        return this.repository.getWeeklyPlanEmployees(limit, page, filters);
    }

    getWeeklyPlanEmployeeById(id: string): Promise<WeeklyPlanEmployee> {
        return this.repository.getWeeklyPlanEmployeeById(id);
    }

    updateWeeklyPlanEmployeeById(id: string, payload: WeeklyPlanEmployeeForm): Promise<string> {
        return this.repository.updateWeeklyPlanEmployeeById(id, payload);
    }

    deleteWeeklyPlanEmployeeById(id: string): Promise<string> {
        return this.repository.deleteWeeklyPlanEmployeeById(id);
    }

    uploadFile(file: File): Promise<UploadWeeklyPlanEmployeesResponse> {
        return this.repository.uploadFile(file);
    }
}

const datasource = new WeeklyPlanEmployeeDatasourceImpl(api);
const repository = new WeeklyPlanEmployeeRepositoryImpl(datasource);
export const weeklyPlanEmployeeProvider = new WeeklyPlanEmployeeProvider(repository);
