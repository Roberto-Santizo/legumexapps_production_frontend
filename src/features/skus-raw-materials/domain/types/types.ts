import { SkuRawMaterialSchema, PaginatedSkuRawMaterialsSchema } from "@/features/skus-raw-materials/skus-raw-materials";
import type { z } from "zod";

export type PaginatedSkuRawMaterials = z.infer<typeof PaginatedSkuRawMaterialsSchema>;
export type SkuRawMaterial = z.infer<typeof SkuRawMaterialSchema>;

export type SkuRawMaterialForm = {
    percentage: number;
    stock_keeping_unit_code: string;
    raw_material_id: number;
}
