import { ApiPaginatedResponseSchema } from "@/features/shared/shared";
import { z } from "zod";

export const SkuRawMaterialSchema = z.object({
    id: z.number(),
    percentage: z.number(),
    sku: z.string(),
    stock_keeping_unit_id: z.number(),
    raw_material: z.string(),
    raw_material_id: z.number()
});

export const PaginatedSkuRawMaterialsSchema = ApiPaginatedResponseSchema.extend({
    data: z.array(SkuRawMaterialSchema)
});
