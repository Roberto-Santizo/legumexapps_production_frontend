import type { Performance, PerformanceForm } from "@/features/performances/performances";

export const toPerformanceForm = (performance: Performance): PerformanceForm => ({
    sku_id: performance.sku_id,
    line_id: performance.line_id,
    lbs_performance: performance.lbs_performance,
    accepted_percentage: performance.accepted_percentage,
    payment_method: performance.payment_method
});
