import type { FilterField } from "@/features/shared/shared";
import type { WeeklyPlanEmployeeFilters } from "./weeklyPlanEmployeeFilterSchema";

export const weeklyPlanEmployeeFilterFields: FilterField<WeeklyPlanEmployeeFilters>[] = [
    { name: 'name', label: 'Nombre', type: 'text', placeholder: 'Nombre del empleado' },
    { name: 'code', label: 'Código', type: 'text', placeholder: 'Código del empleado' },
    { name: 'position', label: 'Posición', type: 'text', placeholder: 'Ej. 1REM' },
    { name: 'week', label: 'Semana', type: 'number', placeholder: 'Ej. 40' },
    { name: 'year', label: 'Año', type: 'number', placeholder: 'Ej. 2026' }
];
