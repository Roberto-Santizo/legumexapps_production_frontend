import type { FilterField } from "@/features/shared/shared";
import type { LineFilters } from "./lineFilterSchema";

export const lineFilterFields: FilterField<LineFilters>[] = [
    { name: 'name', label: 'Nombre', type: 'text', placeholder: 'Nombre de la línea' },
    { name: 'code', label: 'Código', type: 'text', placeholder: 'Código de la línea' }
];
