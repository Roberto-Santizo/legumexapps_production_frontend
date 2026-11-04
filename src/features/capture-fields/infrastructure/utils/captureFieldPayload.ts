import type { CaptureField, CaptureFieldForm, CaptureFieldOptionForm, CaptureFieldPayload } from "@/features/capture-fields/capture-fields";

export const CAPTURE_FIELD_KEY_PATTERN = /^[a-z][a-z0-9_]*$/;

export const defaultCaptureFieldForm: CaptureFieldForm = {
    key: '',
    label: '',
    data_type: 'text',
    options: []
};

export const toCaptureFieldForm = (field: CaptureField): CaptureFieldForm => ({
    key: field.key,
    label: field.label,
    data_type: field.data_type,
    options: (field.options ?? []).map(value => ({ value }))
});

export const toCaptureFieldPayload = (form: CaptureFieldForm, field?: CaptureField): CaptureFieldPayload => {
    const locked = field?.is_assigned ?? false;
    const dataType = locked && field ? field.data_type : form.data_type;
    const payload: CaptureFieldPayload = { label: form.label.trim() };

    if (!locked) {
        payload.key = form.key.trim();
        payload.data_type = form.data_type;
    }

    if (dataType === 'select') {
        payload.options = form.options.map(option => option.value.trim());
    }

    return payload;
};

const normalizeOption = (value: string): string => value.trim().toLowerCase();

export const isDuplicateOption = (value: string, options: CaptureFieldOptionForm[]): boolean =>
    options.filter(option => normalizeOption(option.value) === normalizeOption(value)).length > 1;
