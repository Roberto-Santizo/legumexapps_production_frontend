import { ApiPaginatedResponseSchema } from "@/features/shared/shared";
import { z } from "zod";

export const LineSchema = z.object({
    id: z.number(),
    name: z.string(),
    code: z.string(),
    shift: z.number()
});

export const PaginatedLinesSchema = ApiPaginatedResponseSchema.extend({
    data: z.array(LineSchema)
});