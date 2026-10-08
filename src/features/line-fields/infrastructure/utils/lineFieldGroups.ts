import type { CaptureField } from "@/features/capture-fields/capture-fields";

export type AvailableFieldGroup = {
    title: string;
    description: string;
    fields: CaptureField[];
}

export const groupAvailableFields = (fields: CaptureField[]): AvailableFieldGroup[] => [
    {
        title: 'Datos de la familia',
        description: 'Se ingresan al registrar',
        fields: fields.filter(field => field.capture_type && !field.is_calculated)
    },
    {
        title: 'Calculados',
        description: 'Los calcula el sistema; requieren sus campos base asignados',
        fields: fields.filter(field => field.is_calculated)
    },
    {
        title: 'Globales',
        description: 'Disponibles para cualquier línea',
        fields: fields.filter(field => !field.capture_type && !field.is_calculated)
    }
].filter(group => group.fields.length > 0);

export const formatOrderNumber = (position: number): string => `${position}`.padStart(2, '0');
