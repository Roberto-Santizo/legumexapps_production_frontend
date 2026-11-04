import { ApiPaginatedResponseSchema } from "@/features/shared/shared";
import { CaptureTypeSchema } from "@/features/capture-fields/capture-fields";
import { z } from "zod";

export const LineSchema = z.object({
    id: z.number(),
    name: z.string(),
    code: z.string(),
    shift: z.number(),
    capture_type: CaptureTypeSchema
});

export const PaginatedLinesSchema = ApiPaginatedResponseSchema.extend({
    data: z.array(LineSchema)
});