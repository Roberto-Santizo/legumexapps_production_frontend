import type { PaginatedWeeklyPlanEmployees, UploadWeeklyPlanEmployeesResponse, WeeklyPlanEmployee, WeeklyPlanEmployeeFilters, WeeklyPlanEmployeeForm } from "@/features/weekly-plan-employees/weekly-plan-employees";

export abstract class WeeklyPlanEmployeeRepository {
    abstract createWeeklyPlanEmployee(payload: WeeklyPlanEmployeeForm): Promise<string>;
    abstract getWeeklyPlanEmployees(limit: string, page: string, filters?: WeeklyPlanEmployeeFilters): Promise<PaginatedWeeklyPlanEmployees>;
    abstract getWeeklyPlanEmployeeById(id: string): Promise<WeeklyPlanEmployee>;
    abstract updateWeeklyPlanEmployeeById(id: string, payload: WeeklyPlanEmployeeForm): Promise<string>;
    abstract deleteWeeklyPlanEmployeeById(id: string): Promise<string>;
    abstract uploadFile(file: File): Promise<UploadWeeklyPlanEmployeesResponse>;
}
