import { ApiResponseSchema } from "@/features/shared/shared";
import { PalletValueSchema } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { z } from "zod";

export const WeeklyPlanTaskLotRecordSchema = z.object({
    id: z.number(),
    weekly_plan_task_id: z.number(),
    entry_date: z.string().nullable(),
    lot: z.string().nullable(),
    recorded_at: z.string().nullable(),
    intake_lbs: z.number().nullable(),
    applied_raw_lbs: z.number().nullable(),
    trimmed_lbs: z.number().nullable(),
    overripe_lbs: z.number().nullable(),
    recovery_pct: z.number().nullable(),
    overripe_pct: z.number().nullable(),
    grn_balance: z.number().nullable(),
    observations: z.string().nullable(),
    extra_values: z.preprocess(
        (value) => Array.isArray(value) || value === null ? {} : value,
        z.record(z.string(), PalletValueSchema)
    ),
    user_id: z.number(),
    user_name: z.string(),
    created_at: z.string(),
    updated_at: z.string()
});

export const WeeklyPlanTaskLotRecordsResponseSchema = ApiResponseSchema.extend({
    data: z.array(WeeklyPlanTaskLotRecordSchema)
});
