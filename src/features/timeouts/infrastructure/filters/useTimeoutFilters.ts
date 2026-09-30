import { defaultTimeoutFilters } from "./defaultTimeoutFilters";
import { TimeoutFiltersSchema } from "./timeoutFilterSchema";
import { useUrlFilters } from "@/features/shared/hooks/useUrlFilters";

export function useTimeoutFilters() {
    return useUrlFilters({
        schema: TimeoutFiltersSchema,
        defaults: defaultTimeoutFilters
    });
}
