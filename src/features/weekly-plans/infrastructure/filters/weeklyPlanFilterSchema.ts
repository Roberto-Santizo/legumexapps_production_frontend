import { z } from "zod";

export const WeeklyPlanFiltersSchema = z.object({
    week: z.string(),
    year: z.string()
});

export type WeeklyPlanFilters = z.infer<typeof WeeklyPlanFiltersSchema>;
