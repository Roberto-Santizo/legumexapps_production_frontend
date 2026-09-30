import type { FilterField } from "@/features/shared/shared";
import type { WeeklyPlanFilters } from "./weeklyPlanFilterSchema";

export const weeklyPlanFilterFields: FilterField<WeeklyPlanFilters>[] = [
    { name: 'week', label: 'Semana', type: 'number', placeholder: 'Ej. 40' },
    { name: 'year', label: 'Año', type: 'number', placeholder: 'Ej. 2026' }
];
