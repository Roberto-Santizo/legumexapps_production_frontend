import { ApiPaginatedResponseSchema } from "@/features/shared/shared";
import { z } from "zod";

export const TimeoutSchema = z.object({
    id: z.number(),
    name: z.string()
});

export const PaginatedTimeoutsSchema = ApiPaginatedResponseSchema.extend({
    data: z.array(TimeoutSchema)
});
