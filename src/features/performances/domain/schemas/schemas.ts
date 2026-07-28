import { ApiPaginatedResponseSchema } from "@/features/shared/shared";
import { z } from "zod";

export const PerformanceSchema = z.object({
    id: z.number(),
    sku: z.string(),
    sku_id: z.number(),
    line: z.string(),
    line_id: z.number(),
    lbs_performance: z.number(),
    accepted_percentage: z.number(),
    payment_method: z.number(),
    status: z.number()
});

export const PaginatedPerformancesSchema = ApiPaginatedResponseSchema.extend({
    data: z.array(PerformanceSchema)
});
