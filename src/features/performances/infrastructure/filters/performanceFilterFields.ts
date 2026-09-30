import type { FilterField } from "@/features/shared/shared";
import type { PerformanceFilters } from "./performanceFilterSchema";
import { paymentMethodFilterOptions, statusFilterOptions } from "../data/data";

export const performanceFilterFields: FilterField<PerformanceFilters>[] = [
    { name: 'sku', label: 'SKU', type: 'text', placeholder: 'Código del SKU' },
    { name: 'line', label: 'Línea', type: 'text', placeholder: 'Nombre de la línea' },
    { name: 'payment_method', label: 'Método de Pago', type: 'select', options: paymentMethodFilterOptions },
    { name: 'status', label: 'Estado', type: 'select', options: statusFilterOptions }
];
