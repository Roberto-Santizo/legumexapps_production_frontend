import type { CaptureField } from "@/features/capture-fields/capture-fields";
import type { AssignLineFieldPayload, LineField, LineFieldForm, UpdateLineFieldPayload } from "@/features/line-fields/line-fields";

export const toAssignLineFieldPayload = (field: CaptureField, order: number): AssignLineFieldPayload => ({
    capture_field_id: field.id,
    is_required: false,
    order
});

export const toLineFieldForm = (field: LineField): LineFieldForm => ({
    is_required: field.is_required,
    label: field.custom_label ?? ''
});

export const toUpdateLineFieldPayload = (form: LineFieldForm, field: LineField): UpdateLineFieldPayload => ({
    is_required: field.is_calculated ? false : form.is_required,
    label: form.label.trim() || null
});
