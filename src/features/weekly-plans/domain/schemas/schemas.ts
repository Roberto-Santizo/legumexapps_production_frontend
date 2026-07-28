import { ApiPaginatedResponseSchema } from "@/features/shared/shared";
import { z } from "zod";

export const WeeklyPlanSchema = z.object({
    id: z.number(),
    week: z.number(),
    year: z.number()
});

export const PaginatedWeeklyPlansSchema = ApiPaginatedResponseSchema.extend({
    data: z.array(WeeklyPlanSchema)
});
