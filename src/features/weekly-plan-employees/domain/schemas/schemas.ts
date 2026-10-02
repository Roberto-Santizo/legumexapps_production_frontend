import { ApiPaginatedResponseSchema, ApiResponseSchema } from "@/features/shared/shared";
import { z } from "zod";

export const WeeklyPlanEmployeeSchema = z.object({
    id: z.number(),
    name: z.string(),
    code: z.string(),
    position: z.string(),
    biometric_position: z.string().nullable(),
    position_id: z.number(),
    employee_id: z.number()
});

export const PaginatedWeeklyPlanEmployeesSchema = ApiPaginatedResponseSchema.extend({
    data: z.array(WeeklyPlanEmployeeSchema),
    lastPage: z.number().optional()
});

export const UploadWeeklyPlanEmployeesResponseSchema = ApiResponseSchema.extend({
    data: z.object({
        created: z.number()
    })
});
