import { PackingMaterialItemSchema, PaginatedPackingMaterialItemsSchema } from "@/features/packing-materials/packing-materials";
import type { z } from "zod";

export type PaginatedPackingMaterialItems = z.infer<typeof PaginatedPackingMaterialItemsSchema>;
export type PackingMaterialItem = z.infer<typeof PackingMaterialItemSchema>;

export type PackingMaterialItemForm = {
    name: string;
    description: string;
    code: string;
}