import { z } from "zod";

export const WeeklyPlanEmployeeFiltersSchema = z.object({
    name: z.string(),
    code: z.string(),
    position: z.string(),
    week: z.string(),
    year: z.string()
});

export type WeeklyPlanEmployeeFilters = z.infer<typeof WeeklyPlanEmployeeFiltersSchema>;
