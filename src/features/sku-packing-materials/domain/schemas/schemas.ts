import { ApiPaginatedResponseSchema } from "@/features/shared/shared";
import { z } from "zod";

export const SkuPackingMaterialSchema = z.object({
    id: z.number(),
    lbs_per_item: z.number(),
    sku: z.string(),
    sku_id: z.number(),
    packing_material: z.string(),
    packing_material_code: z.string(),
    packing_material_id: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
});

export const PaginatedSkuPackingMaterialsSchema = ApiPaginatedResponseSchema.extend({
    data: z.array(SkuPackingMaterialSchema)
});
