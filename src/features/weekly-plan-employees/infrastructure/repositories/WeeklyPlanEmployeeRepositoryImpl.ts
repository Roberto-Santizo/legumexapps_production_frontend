import type { PaginatedWeeklyPlanEmployees, UploadWeeklyPlanEmployeesResponse, WeeklyPlanEmployee, WeeklyPlanEmployeeDatasource, WeeklyPlanEmployeeFilters, WeeklyPlanEmployeeForm, WeeklyPlanEmployeeRepository } from "@/features/weekly-plan-employees/weekly-plan-employees";

export class WeeklyPlanEmployeeRepositoryImpl implements WeeklyPlanEmployeeRepository {
    constructor(private datasource: WeeklyPlanEmployeeDatasource) { }

    createWeeklyPlanEmployee(payload: WeeklyPlanEmployeeForm): Promise<string> {
        return this.datasource.createWeeklyPlanEmployee(payload);
    }

    getWeeklyPlanEmployees(limit: string, page: string, filters?: WeeklyPlanEmployeeFilters): Promise<PaginatedWeeklyPlanEmployees> {
        return this.datasource.getWeeklyPlanEmployees(limit, page, filters);
    }

    getWeeklyPlanEmployeeById(id: string): Promise<WeeklyPlanEmployee> {
        return this.datasource.getWeeklyPlanEmployeeById(id);
    }

    updateWeeklyPlanEmployeeById(id: string, payload: WeeklyPlanEmployeeForm): Promise<string> {
        return this.datasource.updateWeeklyPlanEmployeeById(id, payload);
    }

    deleteWeeklyPlanEmployeeById(id: string): Promise<string> {
        return this.datasource.deleteWeeklyPlanEmployeeById(id);
    }

    uploadFile(file: File): Promise<UploadWeeklyPlanEmployeesResponse> {
        return this.datasource.uploadFile(file);
    }
}
