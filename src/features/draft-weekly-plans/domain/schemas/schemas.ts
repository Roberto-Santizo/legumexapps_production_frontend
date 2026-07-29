import { ApiPaginatedResponseSchema } from "@/features/shared/shared";
import { z } from "zod";

export const DraftWeeklyPlanSchema = z.object({
    id: z.number(),
    week: z.number(),
    year: z.number(),
    confirmation_date: z.string().nullable()
});

export const PaginatedDraftWeeklyPlansSchema = ApiPaginatedResponseSchema.extend({
    data: z.array(DraftWeeklyPlanSchema)
});
