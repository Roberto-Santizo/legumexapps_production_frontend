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
    position: z.string(),
});
