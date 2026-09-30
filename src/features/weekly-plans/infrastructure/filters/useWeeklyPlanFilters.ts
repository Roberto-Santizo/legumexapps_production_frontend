import { defaultWeeklyPlanFilters } from "./defaultWeeklyPlanFilters";
import { WeeklyPlanFiltersSchema } from "./weeklyPlanFilterSchema";
import { useUrlFilters } from "@/features/shared/hooks/useUrlFilters";

export function useWeeklyPlanFilters() {
    return useUrlFilters({
        schema: WeeklyPlanFiltersSchema,
        defaults: defaultWeeklyPlanFilters
    });
}
