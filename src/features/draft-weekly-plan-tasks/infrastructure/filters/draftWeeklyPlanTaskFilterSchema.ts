import { z } from "zod";

export const DraftWeeklyPlanTaskFiltersSchema = z.object({
    line: z.string(),
    sku: z.string(),
    destination: z.string()
});

export type DraftWeeklyPlanTaskFilters = z.infer<typeof DraftWeeklyPlanTaskFiltersSchema>;
