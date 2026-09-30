import { defaultRawMaterialFilters } from "./defaultRawMaterialFilters";
import { RawMaterialFiltersSchema } from "./rawMaterialFilterSchema";
import { useUrlFilters } from "@/features/shared/hooks/useUrlFilters";

export function useRawMaterialFilters() {
    return useUrlFilters({
        schema: RawMaterialFiltersSchema,
        defaults: defaultRawMaterialFilters
    });
}
