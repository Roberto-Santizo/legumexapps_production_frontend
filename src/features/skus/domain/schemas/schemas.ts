import { ApiPaginatedResponseSchema } from "@/features/shared/shared";
import { z } from "zod";

export const SkuSchema = z.object({
    id: z.number(),
    code: z.string(),
    product_name: z.string(),
    presentation: z.number(),
    boxes_per_pallet: z.number(),
    client: z.string(),
    client_id: z.number()
});

export const PaginatedSkusSchema = ApiPaginatedResponseSchema.extend({
    data: z.array(SkuSchema)
});
