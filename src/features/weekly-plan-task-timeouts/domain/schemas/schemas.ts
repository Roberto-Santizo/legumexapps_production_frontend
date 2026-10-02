import { ApiResponseSchema } from "@/features/shared/shared";
import { z } from "zod";

export const WeeklyPlanTaskTimeoutSchema = z.object({
    id: z.number(),
    weekly_plan_task_id: z.number(),
    timeout_id: z.number(),
    timeout_name: z.string(),
    user_id: z.number(),
    user_name: z.string(),
    start_date: z.string(),
    end_date: z.string().nullable(),
    duration_hours: z.number().nullable(),
    observation: z.string().nullable(),
    is_open: z.boolean()
});

export const WeeklyPlanTaskTimeoutsResponseSchema = ApiResponseSchema.extend({
    data: z.array(WeeklyPlanTaskTimeoutSchema)
});
