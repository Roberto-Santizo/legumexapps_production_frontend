import { SkuSchema, PaginatedSkusSchema } from "@/features/skus/skus";
import type { z } from "zod";

export type PaginatedSkus = z.infer<typeof PaginatedSkusSchema>;
export type Sku = z.infer<typeof SkuSchema>;

export type SkuForm = {
    code: string;
    product_name: string;
    presentation: number;
    boxes_per_pallet: number;
    client_id: number;
}
