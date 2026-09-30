import { defaultPackingMaterialFilters } from "./defaultPackingMaterialFilters";
import { PackingMaterialFiltersSchema } from "./packingMaterialFilterSchema";
import { useUrlFilters } from "@/features/shared/hooks/useUrlFilters";

export function usePackingMaterialFilters() {
    return useUrlFilters({
        schema: PackingMaterialFiltersSchema,
        defaults: defaultPackingMaterialFilters
    });
}
