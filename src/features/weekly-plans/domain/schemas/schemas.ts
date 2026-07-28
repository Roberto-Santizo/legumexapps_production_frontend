import { ApiPaginatedResponseSchema } from "@/features/shared/shared";
import { z } from "zod";

export const WeeklyPlanSchema = z.object({
    id: z.number(),
    week: z.number(),
    year: z.number()
});

export const CalendarEventItemSchema = z.object({
    id: z.string(),
    title: z.string(),
    date: z.string(),
    color: z.string()
});

export const PaginatedWeeklyPlansSchema = ApiPaginatedResponseSchema.extend({
    data: z.array(WeeklyPlanSchema)
});


