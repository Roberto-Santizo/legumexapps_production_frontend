import { defaultSkuFilters } from "./defaultSkuFilters";
import { SkuFiltersSchema } from "./skuFilterSchema";
import { useUrlFilters } from "@/features/shared/hooks/useUrlFilters";

export function useSkuFilters() {
    return useUrlFilters({
        schema: SkuFiltersSchema,
        defaults: defaultSkuFilters
    });
}
