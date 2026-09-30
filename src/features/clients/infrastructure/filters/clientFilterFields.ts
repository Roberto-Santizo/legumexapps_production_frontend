import type { FilterField } from "@/features/shared/shared";
import type { ClientFilters } from "./clientFilterSchema";

export const clientFilterFields: FilterField<ClientFilters>[] = [
    { name: 'name', label: 'Nombre', type: 'text', placeholder: 'Nombre del cliente' }
];
