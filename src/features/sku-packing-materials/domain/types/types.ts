import { SkuPackingMaterialSchema, PaginatedSkuPackingMaterialsSchema } from "@/features/sku-packing-materials/sku-packing-materials";
import type { z } from "zod";

export type PaginatedSkuPackingMaterials = z.infer<typeof PaginatedSkuPackingMaterialsSchema>;
export type SkuPackingMaterial = z.infer<typeof SkuPackingMaterialSchema>;

export type SkuPackingMaterialForm = {
    lbs_per_item: number;
    sku_code: string;
    packing_material_id: number;
}
