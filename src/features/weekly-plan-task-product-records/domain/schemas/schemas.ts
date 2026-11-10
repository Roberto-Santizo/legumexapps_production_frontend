import { ApiResponseSchema } from "@/features/shared/shared";
import { PalletValueSchema } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { z } from "zod";

export const WeeklyPlanTaskProductRecordSchema = z.object({
    id: z.number(),
    weekly_plan_task_id: z.number(),
    raw_material: z.string().nullable(),
    raw_lbs: z.number().nullable(),
    classified_lbs: z.number().nullable(),
    trimmed_lbs: z.number().nullable(),
    rejected_lbs: z.number().nullable(),
    packed_lbs: z.number().nullable(),
    recovery_pct: z.number().nullable(),
    rejection_pct: z.number().nullable(),
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

export const WeeklyPlanTaskProductRecordsResponseSchema = ApiResponseSchema.extend({
    data: z.array(WeeklyPlanTaskProductRecordSchema)
});
