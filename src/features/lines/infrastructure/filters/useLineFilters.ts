import { defaultLineFilters } from "./defaultLineFilters";
import { LineFiltersSchema } from "./lineFilterSchema";
import { useUrlFilters } from "@/features/shared/hooks/useUrlFilters";

export function useLineFilters() {
    return useUrlFilters({
        schema: LineFiltersSchema,
        defaults: defaultLineFilters
    });
}
