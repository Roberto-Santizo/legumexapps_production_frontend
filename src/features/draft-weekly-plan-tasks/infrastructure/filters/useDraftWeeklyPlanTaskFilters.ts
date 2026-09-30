import { defaultDraftWeeklyPlanTaskFilters } from "./defaultDraftWeeklyPlanTaskFilters";
import { DraftWeeklyPlanTaskFiltersSchema } from "./draftWeeklyPlanTaskFilterSchema";
import { useFilters } from "@/features/shared/hooks/useFilters";

export function useDraftWeeklyPlanTaskFilters() {
    return useFilters({
        schema: DraftWeeklyPlanTaskFiltersSchema,
        defaults: defaultDraftWeeklyPlanTaskFilters
    });
}
