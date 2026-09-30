import { defaultPositionFilters } from "./defaultPositionFilters";
import { PositionFiltersSchema } from "./positionFilterSchema";
import { useUrlFilters } from "@/features/shared/hooks/useUrlFilters";

export function usePositionFilters() {
    return useUrlFilters({
        schema: PositionFiltersSchema,
        defaults: defaultPositionFilters
    });
}
