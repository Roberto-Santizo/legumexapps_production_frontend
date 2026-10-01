import { UploadWeeklyPlanEmployeesResponseSchema } from "@/features/weekly-plan-employees/weekly-plan-employees";
import type { z } from "zod";

export type UploadWeeklyPlanEmployeesResponse = z.infer<typeof UploadWeeklyPlanEmployeesResponseSchema>;
