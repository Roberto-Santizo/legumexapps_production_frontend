import { PaginatedWeeklyPlanEmployeesSchema, UploadWeeklyPlanEmployeesResponseSchema, WeeklyPlanEmployeeSchema } from "@/features/weekly-plan-employees/weekly-plan-employees";
import type { z } from "zod";

export type WeeklyPlanEmployee = z.infer<typeof WeeklyPlanEmployeeSchema>;
export type PaginatedWeeklyPlanEmployees = z.infer<typeof PaginatedWeeklyPlanEmployeesSchema>;
export type UploadWeeklyPlanEmployeesResponse = z.infer<typeof UploadWeeklyPlanEmployeesResponseSchema>;

export type WeeklyPlanEmployeeForm = {
    position_id: number;
    employee_id: number;
    weekly_plan_id: number;
}
