import type { FilterField } from "@/features/shared/shared";
import type { LineFilters } from "./lineFilterSchema";
import { lineWildcardOptions } from "../utils/lineWildcard";

export const lineFilterFields: FilterField<LineFilters>[] = [
    { name: 'name', label: 'Nombre', type: 'text', placeholder: 'Nombre de la línea' },
    { name: 'code', label: 'Código', type: 'text', placeholder: 'Código de la línea' },
    { name: 'isWildcard', label: 'Tipo de línea', type: 'select', options: lineWildcardOptions }
];
