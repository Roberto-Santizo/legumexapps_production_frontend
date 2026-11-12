import { ApiPaginatedResponseSchema } from "@/features/shared/shared";
import { z } from "zod";

export const ActivitySchema = z.object({
    id: z.number(),
    name: z.string(),
    unit: z.string()
});

export const PaginatedActivitiesSchema = ApiPaginatedResponseSchema.extend({
    data: z.array(ActivitySchema)
});
