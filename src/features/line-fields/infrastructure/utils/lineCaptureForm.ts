import type { LineCaptureControlKind, LineCaptureFormValues, LineCaptureRecord, LineField } from "@/features/line-fields/line-fields";

const isEmpty = (value: string | boolean | undefined): boolean => value === undefined || value === '';

export const lineCaptureControlKind = (field: LineField): LineCaptureControlKind =>
    field.data_type === 'text' && field.key === 'observations' ? 'textarea' : field.data_type;

export const isWideCaptureControl = (kind: LineCaptureControlKind): boolean => kind === 'textarea';

export const isNumericCaptureControl = (kind: LineCaptureControlKind): boolean => kind === 'number' || kind === 'integer';

export const lineCaptureInputAttributes = (kind: LineCaptureControlKind) => ({
    type: isNumericCaptureControl(kind) ? 'number' : kind,
    step: kind === 'number' ? 'any' : kind === 'integer' ? '1' : undefined,
    inputMode: kind === 'number' ? 'decimal' as const : kind === 'integer' ? 'numeric' as const : undefined
});

export const defaultLineCaptureValues = (fields: LineField[]): LineCaptureFormValues =>
    Object.fromEntries(fields.map(field => [field.key, field.data_type === 'boolean' ? false : '']));

export const validateLineCaptureValue = (field: LineField, value: string | boolean | undefined): true | string => {
    if (field.is_calculated || field.data_type === 'boolean') return true;

    if (isEmpty(value)) return field.is_required ? 'El campo es obligatorio' : true;

    const text = String(value);

    if (field.data_type === 'number' && Number.isNaN(Number(text))) return 'Ingrese un número válido';
    if (field.data_type === 'integer' && !Number.isInteger(Number(text))) return 'Ingrese un número entero';
    if (field.data_type === 'select' && !(field.options ?? []).includes(text)) return 'Seleccione una opción válida';

    return true;
};

const parseLineCaptureValue = (field: LineField, value: string | boolean | undefined): string | number | boolean | null => {
    if (field.data_type === 'boolean') return Boolean(value);
    if (isEmpty(value)) return null;
    if (field.data_type === 'number' || field.data_type === 'integer') return Number(value);
    return String(value).trim();
};

export const lineFieldsSignature = (fields: LineField[]): string =>
    fields.map(field => `${field.id}:${field.order}:${field.is_required}:${field.label}`).join('|');

export const toLineCaptureRecord =(fields: LineField[], values: LineCaptureFormValues): LineCaptureRecord =>
    Object.fromEntries(
        fields
            .filter(field => !field.is_calculated)
            .map(field => [field.key, parseLineCaptureValue(field, values[field.key])])
    );
