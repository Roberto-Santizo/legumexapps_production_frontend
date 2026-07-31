import { PackingMaterialTransactionSchema, PaginatedPackingMaterialTransactionsSchema } from "@/features/packing-material-transactions/packing-material-transactions";
import type { z } from "zod";

export type PaginatedPackingMaterialTransactions = z.infer<typeof PaginatedPackingMaterialTransactionsSchema>;
export type PackingMaterialTransaction = z.infer<typeof PackingMaterialTransactionSchema>;

export type PackingMaterialTransactionItemForm = {
    quantity: number;
    lote: string;
    destination: string;
    packing_material_id: number;
}

export type PackingMaterialTransactionCreateForm = {
    reference: string;
    responsable: string;
    observations: string;
    responsable_signature: string;
    user_signature: string;
    type: number;
    weekly_plan_task_id: number;
    items: PackingMaterialTransactionItemForm[];
}

export type PackingMaterialTransactionUpdateForm = {
    reference: string;
    responsable: string;
    observations: string;
    responsable_signature: string;
    user_signature: string;
    type: number;
    user_id: number;
    weekly_plan_task_id: number;
}
