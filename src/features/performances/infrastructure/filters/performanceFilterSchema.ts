import { z } from "zod";

export const PerformanceFiltersSchema = z.object({
    sku: z.string(),
    line: z.string(),
    payment_method: z.string(),
    status: z.string()
});

export type PerformanceFilters = z.infer<typeof PerformanceFiltersSchema>;
