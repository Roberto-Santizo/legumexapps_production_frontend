import { defaultDraftWeeklyPlanFilters } from "./defaultDraftWeeklyPlanFilters";
import { DraftWeeklyPlanFiltersSchema } from "./draftWeeklyPlanFilterSchema";
import { useUrlFilters } from "@/features/shared/hooks/useUrlFilters";

export function useDraftWeeklyPlanFilters() {
    return useUrlFilters({
        schema: DraftWeeklyPlanFiltersSchema,
        defaults: defaultDraftWeeklyPlanFilters
    });
}
