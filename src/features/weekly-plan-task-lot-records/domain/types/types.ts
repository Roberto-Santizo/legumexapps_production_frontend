import { WeeklyPlanTaskLotRecordSchema } from "@/features/weekly-plan-task-lot-records/weekly-plan-task-lot-records";
import type { PerformanceRecordValues } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import type { z } from "zod";

export type WeeklyPlanTaskLotRecord = z.infer<typeof WeeklyPlanTaskLotRecordSchema>;

export type WeeklyPlanTaskLotRecordForm = {
    values: PerformanceRecordValues;
}

export type WeeklyPlanTaskLotRecordCreateForm = WeeklyPlanTaskLotRecordForm & {
    weekly_plan_task_id: number;
}

export type LotRecordsTotals = {
    intake_lbs: number;
    applied_raw_lbs: number;
    trimmed_lbs: number;
    overripe_lbs: number;
    recovery_pct: number | null;
    overripe_pct: number | null;
    grn_balance: number;
}

export type WeeklyPlanTaskLotRecordsSummary = {
    count: number;
    totals: LotRecordsTotals;
}

export type LotRecordEstimateValues = {
    recovery_pct: number | null;
    overripe_pct: number | null;
    grn_balance: number | null;
}

export type LotRecordEstimateInput = {
    intakeLbs: number | null;
    appliedRawLbs: number | null;
    trimmedLbs: number | null;
    overripeLbs: number | null;
}
