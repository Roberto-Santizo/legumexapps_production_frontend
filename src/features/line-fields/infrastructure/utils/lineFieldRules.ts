import type { CaptureField } from "@/features/capture-fields/capture-fields";
import type { LineField } from "@/features/line-fields/line-fields";

export const availableCaptureFields = (catalog: CaptureField[], assigned: LineField[]): CaptureField[] => {
    const assignedIds = new Set(assigned.map(field => field.capture_field_id));
    return catalog.filter(field => !assignedIds.has(field.id));
};

export const missingDependencies = (field: Pick<CaptureField, 'id' | 'depends_on'>, assigned: LineField[]): string[] => {
    const assignedKeys = new Set(
        assigned.filter(item => item.capture_field_id !== field.id).map(item => item.key)
    );
    return field.depends_on.filter(key => !assignedKeys.has(key));
};

export const missingDependencyLabels = (field: CaptureField, assigned: LineField[], catalog: CaptureField[]): string[] =>
    missingDependencies(field, assigned).map(key =>
        catalog.find(item => item.key === key && item.capture_type === field.capture_type)?.label ?? key
    );

export const blockingCalculated = (field: LineField, assigned: LineField[]): LineField[] =>
    assigned.filter(item => item.is_calculated && item.depends_on.includes(field.key));
