import { ApiResponseSchema } from "@/features/shared/shared";
import { z } from "zod";

export const WeeklyPlanTaskPerformanceRecordSchema = z.object({
    id: z.number(),
    weekly_plan_task_id: z.number(),
    pallet_number: z.number().nullable(),
    boxes: z.number().nullable(),
    weighed_pounds: z.number(),
    theoretical_pounds: z.number(),
    difference_pounds: z.number(),
    user_id: z.number(),
    user_name: z.string(),
    created_at: z.string(),
    updated_at: z.string()
});

export const WeeklyPlanTaskPerformanceRecordsResponseSchema = ApiResponseSchema.extend({
    data: z.array(WeeklyPlanTaskPerformanceRecordSchema)
});
