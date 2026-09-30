import { z } from "zod";

export const DraftWeeklyPlanFiltersSchema = z.object({
    week: z.string(),
    year: z.string()
});

export type DraftWeeklyPlanFilters = z.infer<typeof DraftWeeklyPlanFiltersSchema>;
