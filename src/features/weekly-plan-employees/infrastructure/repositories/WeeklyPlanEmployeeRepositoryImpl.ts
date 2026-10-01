import type { UploadWeeklyPlanEmployeesResponse, WeeklyPlanEmployeeDatasource, WeeklyPlanEmployeeRepository } from "@/features/weekly-plan-employees/weekly-plan-employees";

export class WeeklyPlanEmployeeRepositoryImpl implements WeeklyPlanEmployeeRepository {
    constructor(private datasource: WeeklyPlanEmployeeDatasource) { }

    uploadFile(file: File): Promise<UploadWeeklyPlanEmployeesResponse> {
        return this.datasource.uploadFile(file);
    }
}
