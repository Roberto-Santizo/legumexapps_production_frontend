import { defaultClientFilters } from "./defaultClientFilters";
import { ClientFiltersSchema } from "./clientFilterSchema";
import { useUrlFilters } from "@/features/shared/hooks/useUrlFilters";

export function useClientFilters() {
    return useUrlFilters({
        schema: ClientFiltersSchema,
        defaults: defaultClientFilters
    });
}
