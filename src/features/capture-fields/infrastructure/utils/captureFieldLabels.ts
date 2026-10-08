import type { Option } from "@/features/shared/shared";
import type { CaptureField, CaptureFieldDataType, CaptureType } from "@/features/capture-fields/capture-fields";

export const captureTypeLabels: Record<CaptureType, string> = {
    pallet: 'Tarimas',
    lot: 'Lotes',
    product: 'Producto'
};

export const captureTypeDescriptions: Record<CaptureType, string> = {
    pallet: 'Tarimas con peso báscula y tara',
    lot: 'Lotes (GRN) con libras recortadas',
    product: 'Variantes de producto'
};

export const captureFieldDataTypeLabels: Record<CaptureFieldDataType, string> = {
    number: 'Decimal',
    integer: 'Entero',
    text: 'Texto',
    date: 'Fecha',
    time: 'Hora',
    boolean: 'Sí / No',
    select: 'Selección'
};

export const captureTypeOptions: Option[] = (Object.keys(captureTypeLabels) as CaptureType[])
    .map(value => ({ value, label: captureTypeLabels[value] }));

export const captureFieldDataTypeOptions: Option[] = (Object.keys(captureFieldDataTypeLabels) as CaptureFieldDataType[])
    .map(value => ({ value, label: captureFieldDataTypeLabels[value] }));

export const captureFieldOriginOptions: Option[] = [
    { value: 'true', label: 'Sistema' },
    { value: 'false', label: 'Personalizado' }
];

export const captureFieldScopeLabel = (field: Pick<CaptureField, 'capture_type'>): string =>
    field.capture_type ? captureTypeLabels[field.capture_type] : 'Global';
