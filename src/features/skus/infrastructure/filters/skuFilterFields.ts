import type { FilterField } from "@/features/shared/shared";
import type { SkuFilters } from "./skuFilterSchema";

export const skuFilterFields: FilterField<SkuFilters>[] = [
    { name: 'code', label: 'Código', type: 'text', placeholder: 'Código del SKU' },
    { name: 'product_name', label: 'Producto', type: 'text', placeholder: 'Nombre del producto' },
    { name: 'client', label: 'Cliente', type: 'text', placeholder: 'Nombre del cliente' }
];
