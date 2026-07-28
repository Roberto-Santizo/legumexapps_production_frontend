import { ApiPaginatedResponseSchema } from "@/features/shared/shared";
import { z } from "zod";

export const RawMaterialItemSchema = z.object({
    id: z.number(),
    code: z.string(),
    product_name: z.string()
});

export const PaginatedRawMaterialItemsSchema = ApiPaginatedResponseSchema.extend({
    data: z.array(RawMaterialItemSchema)
});
