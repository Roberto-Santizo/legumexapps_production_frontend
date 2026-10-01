import { WeeklyPlanEmployeeDatasourceImpl, WeeklyPlanEmployeeRepositoryImpl } from "@/features/weekly-plan-employees/infrastructure/infrastructure";
import type { UploadWeeklyPlanEmployeesResponse, WeeklyPlanEmployeeRepository } from "@/features/weekly-plan-employees/weekly-plan-employees";
import api from "@/config/http/axios";

export class WeeklyPlanEmployeeProvider {
    constructor(private repository: WeeklyPlanEmployeeRepository) { }

    uploadFile(file: File): Promise<UploadWeeklyPlanEmployeesResponse> {
        return this.repository.uploadFile(file);
    }
}

const datasource = new WeeklyPlanEmployeeDatasourceImpl(api);
const repository = new WeeklyPlanEmployeeRepositoryImpl(datasource);
export const weeklyPlanEmployeeProvider = new WeeklyPlanEmployeeProvider(repository);
