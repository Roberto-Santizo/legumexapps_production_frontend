import { ApiPaginatedResponseSchema } from "@/features/shared/shared";
import { CaptureTypeSchema } from "@/features/capture-fields/capture-fields";
import { z } from "zod";

export const LineSchema = z.object({
    id: z.number(),
    name: z.string(),
    code: z.string(),
    shift: z.number(),
    capture_type: CaptureTypeSchema,
    is_wildcard: z.boolean(),
    supervisor_code: z.string().nullable()
});

export const PaginatedLinesSchema = ApiPaginatedResponseSchema.extend({
    data: z.array(LineSchema)
});