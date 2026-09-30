import type { FilterField } from "@/features/shared/shared";
import type { PositionFilters } from "./positionFilterSchema";

export const positionFilterFields: FilterField<PositionFilters>[] = [
    { name: 'line', label: 'Línea', type: 'text', placeholder: 'Nombre de la línea' },
    { name: 'code', label: 'Código', type: 'text', placeholder: 'Código del puesto' },
    { name: 'activity', label: 'Actividad', type: 'text', placeholder: 'Actividad del puesto' }
];
