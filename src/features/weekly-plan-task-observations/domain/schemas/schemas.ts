import { ApiPaginatedResponseSchema } from "@/features/shared/shared";
import { z } from "zod";

export const WeeklyPlanTaskObservationSchema = z.object({
    id: z.number(),
    weekly_plan_task_id: z.number(),
    observation: z.string(),
    user_id: z.number(),
    user_name: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    was_edited: z.boolean()
});

export const PaginatedWeeklyPlanTaskObservationsSchema = ApiPaginatedResponseSchema.extend({
    data: z.array(WeeklyPlanTaskObservationSchema)
});
