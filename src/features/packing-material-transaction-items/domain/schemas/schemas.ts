import { ApiPaginatedResponseSchema } from "@/features/shared/shared";
import { z } from "zod";

export const PackingMaterialTransactionItemSchema = z.object({
    id: z.number(),
    quantity: z.number(),
    lote: z.string(),
    destination: z.string().nullable(),
    packing_material_id: z.number(),
    packing_material_name: z.string().nullable(),
    packing_material_code: z.string().nullable(),
    pm_transaction_id: z.number()
});

export const PaginatedPackingMaterialTransactionItemsSchema = ApiPaginatedResponseSchema.extend({
    data: z.array(PackingMaterialTransactionItemSchema)
});
