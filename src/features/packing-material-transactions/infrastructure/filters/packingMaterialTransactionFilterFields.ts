import type { FilterField } from "@/features/shared/shared";
import type { PackingMaterialTransactionFilters } from "./packingMaterialTransactionFilterSchema";
import { transactionTypeOptions } from "../data/data";

export const packingMaterialTransactionFilterFields: FilterField<PackingMaterialTransactionFilters>[] = [
    { name: 'reference', label: 'Referencia', type: 'text', placeholder: 'Referencia de la transacción' },
    { name: 'responsable', label: 'Responsable', type: 'text', placeholder: 'Nombre del responsable' },
    { name: 'type', label: 'Tipo', type: 'select', options: transactionTypeOptions }
];
