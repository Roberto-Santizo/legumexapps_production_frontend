import { PerformanceSchema, PaginatedPerformancesSchema } from "@/features/performances/performances";
import type { z } from "zod";

export type PaginatedPerformances = z.infer<typeof PaginatedPerformancesSchema>;
export type Performance = z.infer<typeof PerformanceSchema>;

export type PerformanceForm = {
    sku_id: number;
    line_id: number;
    lbs_performance: number;
    accepted_percentage: number;
    payment_method: number;
}
