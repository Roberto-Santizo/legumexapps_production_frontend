import { z } from "zod";

export const WeeklyPlanEmployeeSchema = z.object({
    id: z.coerce.string(),
    name: z.string(),
    code: z.string(),
    position: z.string(),
});

export const WeeklyPlanTaskEmployeeSchema = z.object({
    id: z.number(),
    name: z.string(),
    code: z.string(),
    position_id: z.number().nullable(),
    position: z.string().nullable(),
    position_activity: z.string().nullable(),
    line_sku_activity_id: z.number().nullable(),
    activity: z.string().nullable(),
    unit: z.string().nullable(),
});

export const PreviousEmployeeSchema = z.object({
    code: z.string(),
    name: z.string(),
    position: z.string().nullable(),
    line_sku_activity_id: z.number().nullable(),
});

export const PreviousEmployeesConfigurationSchema = z.object({
    employees: z.array(PreviousEmployeeSchema),
});
