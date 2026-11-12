import type { FilterField } from "@/features/shared/shared";
import type { ActivityFilters } from "./activityFilterSchema";

export const activityFilterFields: FilterField<ActivityFilters>[] = [
    { name: 'name', label: 'Nombre', type: 'text', placeholder: 'Nombre de la actividad' }
];
