import { defaultActivityFilters } from "./defaultActivityFilters";
import { ActivityFiltersSchema } from "./activityFilterSchema";
import { useUrlFilters } from "@/features/shared/hooks/useUrlFilters";

export function useActivityFilters() {
    return useUrlFilters({
        schema: ActivityFiltersSchema,
        defaults: defaultActivityFilters
    });
}
