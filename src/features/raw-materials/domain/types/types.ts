import { RawMaterialItemSchema, PaginatedRawMaterialItemsSchema } from "@/features/raw-materials/raw-materials";
import type { z } from "zod";

export type PaginatedRawMaterialItems = z.infer<typeof PaginatedRawMaterialItemsSchema>;
export type RawMaterialItem = z.infer<typeof RawMaterialItemSchema>;

export type RawMaterialItemForm = {
    code: string;
    product_name: string;
}
