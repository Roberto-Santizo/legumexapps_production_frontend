import { z } from "zod";

export const WeeklyPlanTaskFiltersSchema = z.object({
    weeklyPlanId: z.string(),
    noOperationDate: z.string(),
    operationDate: z.string(),
    lineCode: z.string(),
    lineId: z.string(),
    skuCode: z.string()
});

export type WeeklyPlanTaskFilters = z.infer<typeof WeeklyPlanTaskFiltersSchema>;
