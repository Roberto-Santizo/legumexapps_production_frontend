import { ApiResponseSchema } from "@/features/shared/shared";
import { z } from "zod";

export const PalletValueSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);

export const WeeklyPlanTaskPerformanceRecordSchema = z.object({
    id: z.number(),
    weekly_plan_task_id: z.number(),
    pallet_number: z.number().nullable(),
    lot: z.string().nullable(),
    recorded_at: z.string().nullable(),
    boxes: z.number().nullable(),
    liters: z.number().nullable(),
    status: z.string().nullable(),
    scale_weight: z.number().nullable(),
    tare: z.number().nullable(),
    net_weight: z.number().nullable(),
    ticket_weight: z.number().nullable(),
    difference: z.number().nullable(),
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

export const WeeklyPlanTaskPerformanceRecordsResponseSchema = ApiResponseSchema.extend({
    data: z.array(WeeklyPlanTaskPerformanceRecordSchema)
});
