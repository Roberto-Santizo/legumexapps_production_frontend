import { ApiPaginatedResponseSchema } from "@/features/shared/shared";
import { z } from "zod";

export const WeeklyPlanTaskSchema = z.object({
    id: z.number(),
    boxes: z.number(),
    produced_boxes: z.number().nullable(),
    pallets: z.number(),
    produced_pallets: z.number().nullable(),
    hours: z.number(),
    weighed_pounds: z.number().nullable(),
    destination: z.string(),
    operation_date: z.string().nullable(),
    operation_date_string: z.string(),
    start_date: z.string().nullable(),
    end_date: z.string().nullable(),
    weekly_plan_id: z.number(),
    line_sku_id: z.number(),
    sku_name: z.string(),
    sku_code: z.string(),
    line_name: z.string(),
    line_code: z.string()
});

export const PaginatedWeeklyPlanTasksSchema = ApiPaginatedResponseSchema.extend({
    data: z.array(WeeklyPlanTaskSchema)
});
