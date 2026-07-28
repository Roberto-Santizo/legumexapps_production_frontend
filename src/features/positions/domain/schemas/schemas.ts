import { ApiPaginatedResponseSchema } from "@/features/shared/shared";
import { z } from "zod";

export const PositionSchema = z.object({
    id: z.number(),
    code: z.string(),
    activity: z.string(),
    line_id: z.number(),
    line: z.string(),
    status: z.number()
});

export const PaginatedPositionsSchema = ApiPaginatedResponseSchema.extend({
    data: z.array(PositionSchema)
});
