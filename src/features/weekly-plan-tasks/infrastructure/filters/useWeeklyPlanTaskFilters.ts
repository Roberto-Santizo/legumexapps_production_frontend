import { defaultWeeklyPlanTaskFilters } from "./defaultWeeklyPlanTaskFilters";
import { useFilters } from "@/features/shared/hooks/useFilters";
import { useMemo } from "react";
import { WeeklyPlanTaskFiltersSchema, type WeeklyPlanTaskFilters } from "./weeklyPlanTaskFilterSchema";

export function useWeeklyPlanTaskFilters(initial?: Partial<WeeklyPlanTaskFilters>) {
    const defaults = useMemo(() => ({ ...defaultWeeklyPlanTaskFilters, ...initial }), [initial]);

    return useFilters({
        schema: WeeklyPlanTaskFiltersSchema,
        defaults
    });
}
