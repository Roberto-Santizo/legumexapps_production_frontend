import type { PerformanceRecordFormErrors, PerformanceRecordValues } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

export const RAW_MATERIAL_MAX_LENGTH = 150;

export const CLASSIFIED_OVER_RAW_MESSAGE = 'Las libras clasificadas no pueden superar las libras de materia prima';

export const TRIMMED_OVER_RAW_MESSAGE = 'Las libras recortadas y el rechazo no pueden superar las libras de materia prima';

export const PACKED_OVER_TRIMMED_MESSAGE = 'Lo empacado no puede superar las libras recortadas';

const PRODUCT_RULE_ERROR_FIELDS: [string, string][] = [
    [CLASSIFIED_OVER_RAW_MESSAGE, 'classified_lbs'],
    [TRIMMED_OVER_RAW_MESSAGE, 'trimmed_lbs'],
    [PACKED_OVER_TRIMMED_MESSAGE, 'packed_lbs'],
];

export const getProductRuleErrorField = (message: string): string | null =>
    PRODUCT_RULE_ERROR_FIELDS.find(([prefix]) => message.startsWith(prefix))?.[1] ?? null;

export const isProductTaskNotInProgressError = (message: string) => message.startsWith('Solo se pueden registrar productos');

const numericValue = (values: PerformanceRecordValues, key: string): number | null => {
    const value = values[key];
    return typeof value === 'number' ? value : null;
};

export function validateProductRecordRules(values: PerformanceRecordValues): PerformanceRecordFormErrors | null {
    const rawLbs = numericValue(values, 'raw_lbs');
    const classifiedLbs = numericValue(values, 'classified_lbs');
    const trimmedLbs = numericValue(values, 'trimmed_lbs');
    const rejectedLbs = numericValue(values, 'rejected_lbs');
    const packedLbs = numericValue(values, 'packed_lbs');
    const rawMaterial = values.raw_material;
    const byField: Record<string, string> = {};

    if (typeof rawMaterial === 'string' && rawMaterial.length > RAW_MATERIAL_MAX_LENGTH) {
        byField.raw_material = `La materia prima no debe exceder ${RAW_MATERIAL_MAX_LENGTH} caracteres`;
    }

    if (classifiedLbs !== null && rawLbs !== null && classifiedLbs > rawLbs) {
        byField.classified_lbs = CLASSIFIED_OVER_RAW_MESSAGE;
    }

    if (rawLbs !== null && (trimmedLbs !== null || rejectedLbs !== null) && (trimmedLbs ?? 0) + (rejectedLbs ?? 0) > rawLbs) {
        byField[trimmedLbs !== null ? 'trimmed_lbs' : 'rejected_lbs'] = TRIMMED_OVER_RAW_MESSAGE;
    }

    if (packedLbs !== null && trimmedLbs !== null && packedLbs > trimmedLbs) {
        byField.packed_lbs = PACKED_OVER_TRIMMED_MESSAGE;
    }

    return Object.keys(byField).length > 0 ? { byField, general: [] } : null;
}
