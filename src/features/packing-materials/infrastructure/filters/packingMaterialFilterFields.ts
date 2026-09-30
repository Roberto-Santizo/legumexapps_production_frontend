import type { FilterField } from "@/features/shared/shared";
import type { PackingMaterialFilters } from "./packingMaterialFilterSchema";

export const packingMaterialFilterFields: FilterField<PackingMaterialFilters>[] = [
    { name: 'code', label: 'Código', type: 'text', placeholder: 'Código del material' },
    { name: 'name', label: 'Nombre', type: 'text', placeholder: 'Nombre del material' }
];
