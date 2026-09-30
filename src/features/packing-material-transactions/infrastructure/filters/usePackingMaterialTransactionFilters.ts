import { defaultPackingMaterialTransactionFilters } from "./defaultPackingMaterialTransactionFilters";
import { PackingMaterialTransactionFiltersSchema } from "./packingMaterialTransactionFilterSchema";
import { useUrlFilters } from "@/features/shared/hooks/useUrlFilters";

export function usePackingMaterialTransactionFilters() {
    return useUrlFilters({
        schema: PackingMaterialTransactionFiltersSchema,
        defaults: defaultPackingMaterialTransactionFilters
    });
}
