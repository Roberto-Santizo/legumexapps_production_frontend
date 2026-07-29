import { ApiPaginatedResponseSchema } from "@/features/shared/shared";
import { z } from "zod";

export const DraftWeeklyPlanTaskSchema = z.object({
    id: z.number(),
    boxes: z.number(),
    destination: z.string(),
    hours: z.number(),
    operation_date: z.string().nullable(),
    operation_date_string: z.string(),
    draft_weekly_plan_id: z.number(),
    sku_id: z.number(),
    line_id: z.number().nullable(),
    sku_name: z.string(),
    sku_code: z.string(),
    line_name: z.string().nullable(),
    line_code: z.string().nullable()
});

export const PaginatedDraftWeeklyPlanTasksSchema = ApiPaginatedResponseSchema.extend({
    data: z.array(DraftWeeklyPlanTaskSchema)
});
