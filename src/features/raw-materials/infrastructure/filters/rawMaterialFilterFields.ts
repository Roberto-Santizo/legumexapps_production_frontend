import type { FilterField } from "@/features/shared/shared";
import type { RawMaterialFilters } from "./rawMaterialFilterSchema";

export const rawMaterialFilterFields: FilterField<RawMaterialFilters>[] = [
    { name: 'code', label: 'Código', type: 'text', placeholder: 'Código de la materia prima' },
    { name: 'product_name', label: 'Producto', type: 'text', placeholder: 'Nombre del producto' }
];
