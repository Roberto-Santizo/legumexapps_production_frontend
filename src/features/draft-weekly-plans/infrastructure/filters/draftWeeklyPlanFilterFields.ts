import type { FilterField } from "@/features/shared/shared";
import type { DraftWeeklyPlanFilters } from "./draftWeeklyPlanFilterSchema";

export const draftWeeklyPlanFilterFields: FilterField<DraftWeeklyPlanFilters>[] = [
    { name: 'week', label: 'Semana', type: 'number', placeholder: 'Ej. 40' },
    { name: 'year', label: 'Año', type: 'number', placeholder: 'Ej. 2026' }
];
