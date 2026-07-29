import { z } from "zod";

export const PerformanceFiltersSchema = z.object({
    line_id: z.string(),
    sku: z.string(),
    payment_method: z.string()
});

export type PerformanceFilters = z.infer<typeof PerformanceFiltersSchema>;