import { defaultWeeklyPlanEmployeeFilters } from "./defaultWeeklyPlanEmployeeFilters";
import { WeeklyPlanEmployeeFiltersSchema } from "./weeklyPlanEmployeeFilterSchema";
import { useUrlFilters } from "@/features/shared/hooks/useUrlFilters";

export function useWeeklyPlanEmployeeFilters() {
    return useUrlFilters({
        schema: WeeklyPlanEmployeeFiltersSchema,
        defaults: defaultWeeklyPlanEmployeeFilters
    });
}
