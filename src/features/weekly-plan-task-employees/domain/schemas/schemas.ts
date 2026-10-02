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

export const WeeklyPlanTaskEmployeeSchema = z.object({
    id: z.number(),
    weekly_plan_employee_id: z.number(),
    name: z.string(),
    code: z.string(),
    position_id: z.number(),
    position: z.string(),
    replaced_weekly_plan_employee_id: z.number().nullable(),
    replaced_name: z.string().nullable(),
    replaced_code: z.string().nullable()
});
