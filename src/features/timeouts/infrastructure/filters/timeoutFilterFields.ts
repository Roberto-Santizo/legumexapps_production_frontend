import type { FilterField } from "@/features/shared/shared";
import type { TimeoutFilters } from "./timeoutFilterSchema";

export const timeoutFilterFields: FilterField<TimeoutFilters>[] = [
    { name: 'name', label: 'Nombre', type: 'text', placeholder: 'Nombre del tiempo muerto' }
];
