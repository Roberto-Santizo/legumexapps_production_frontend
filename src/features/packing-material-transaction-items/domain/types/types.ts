import { PackingMaterialTransactionItemSchema, PaginatedPackingMaterialTransactionItemsSchema } from "@/features/packing-material-transaction-items/packing-material-transaction-items";
import type { z } from "zod";

export type PaginatedPackingMaterialTransactionItems = z.infer<typeof PaginatedPackingMaterialTransactionItemsSchema>;
export type PackingMaterialTransactionItem = z.infer<typeof PackingMaterialTransactionItemSchema>;

export type PackingMaterialTransactionItemForm = {
    quantity: number;
    lote: string;
    destination: string;
    packing_material_id: number;
}

export type PackingMaterialTransactionItemPayload = PackingMaterialTransactionItemForm & {
    pm_transaction_id: number;
}
