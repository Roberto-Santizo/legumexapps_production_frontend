import { ApiPaginatedResponseSchema } from "@/features/shared/shared";
import { z } from "zod";

export const PackingMaterialItemSchema = z.object({
    id: z.number(),
    name: z.string(),
    code: z.string(),
    description: z.string(),
    blocked: z.boolean()
});

export const PaginatedPackingMaterialItemsSchema = ApiPaginatedResponseSchema.extend({
    data: z.array(PackingMaterialItemSchema)
});