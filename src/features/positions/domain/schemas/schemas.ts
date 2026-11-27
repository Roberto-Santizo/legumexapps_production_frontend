import { ApiPaginatedResponseSchema } from "@/features/shared/shared";
import { z } from "zod";

export const PositionSchema = z.object({
    id: z.number(),
    code: z.string(),
    activity_id: z.number().nullable(),
    activity: z.string().nullable(),
    unit: z.string().nullable(),
    line_sku_id: z.number(),
    line_id: z.number(),
    line: z.string(),
    sku: z.string(),
    status: z.boolean()
});

export const PaginatedPositionsSchema = ApiPaginatedResponseSchema.extend({
    data: z.array(PositionSchema)
});
