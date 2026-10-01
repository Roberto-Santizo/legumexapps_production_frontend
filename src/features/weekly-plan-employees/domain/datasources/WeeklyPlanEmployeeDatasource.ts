import type { UploadWeeklyPlanEmployeesResponse } from "@/features/weekly-plan-employees/weekly-plan-employees";

export abstract class WeeklyPlanEmployeeDatasource {
    abstract uploadFile(file: File): Promise<UploadWeeklyPlanEmployeesResponse>;
}
