import { defaultPerformanceFilters } from "./defaultPerformanceFilters";
import { PerformanceFiltersSchema } from "./performanceFilterSchema";
import { useUrlFilters } from "@/features/shared/hooks/useUrlFilters";

export function usePerformancesFilters() {
    return useUrlFilters({
        schema: PerformanceFiltersSchema,
        defaults: defaultPerformanceFilters
    });
}