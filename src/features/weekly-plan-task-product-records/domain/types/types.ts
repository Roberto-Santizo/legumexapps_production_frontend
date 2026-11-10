import { WeeklyPlanTaskProductRecordSchema } from "@/features/weekly-plan-task-product-records/weekly-plan-task-product-records";
import type { PerformanceRecordValues } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import type { z } from "zod";

export type WeeklyPlanTaskProductRecord = z.infer<typeof WeeklyPlanTaskProductRecordSchema>;

export type WeeklyPlanTaskProductRecordForm = {
    values: PerformanceRecordValues;
}

export type WeeklyPlanTaskProductRecordCreateForm = WeeklyPlanTaskProductRecordForm & {
    weekly_plan_task_id: number;
}

export type ProductRecordsTotals = {
    raw_lbs: number;
    classified_lbs: number;
    trimmed_lbs: number;
    rejected_lbs: number;
    packed_lbs: number;
    recovery_pct: number | null;
    rejection_pct: number | null;
}

export type WeeklyPlanTaskProductRecordsSummary = {
    count: number;
    totals: ProductRecordsTotals;
}

export type ProductRecordEstimateValues = {
    recovery_pct: number | null;
    rejection_pct: number | null;
}

export type ProductRecordEstimateInput = {
    rawLbs: number | null;
    trimmedLbs: number | null;
    rejectedLbs: number | null;
}
