import type { PerformanceRecordFormErrors, PerformanceRecordValues } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

export const APPLIED_OVER_INTAKE_MESSAGE = 'La MP aplicada no puede ser mayor a las libras al ingreso';

export const TRIMMED_OVER_APPLIED_MESSAGE = 'Las libras recortadas y sobremaduras no pueden superar la MP aplicada';

const LOT_RULE_ERROR_FIELDS: [RegExp, string][] = [
    [/^El lote .+ ya fue registrado en la tarea/, 'lot'],
    [new RegExp(`^${APPLIED_OVER_INTAKE_MESSAGE}`), 'applied_raw_lbs'],
    [new RegExp(`^${TRIMMED_OVER_APPLIED_MESSAGE}`), 'trimmed_lbs'],
];

export const getLotRuleErrorField = (message: string): string | null =>
    LOT_RULE_ERROR_FIELDS.find(([pattern]) => pattern.test(message))?.[1] ?? null;

export const isLotTaskNotInProgressError = (message: string) => message.startsWith('Solo se pueden registrar lotes');

export const isLineWithoutFieldsError = (message: string) => message.startsWith('La línea no tiene campos de captura configurados');

const numericValue = (values: PerformanceRecordValues, key: string): number | null => {
    const value = values[key];
    return typeof value === 'number' ? value : null;
};

export function validateLotRecordRules(values: PerformanceRecordValues): PerformanceRecordFormErrors | null {
    const intakeLbs = numericValue(values, 'intake_lbs');
    const appliedRawLbs = numericValue(values, 'applied_raw_lbs');
    const trimmedLbs = numericValue(values, 'trimmed_lbs');
    const overripeLbs = numericValue(values, 'overripe_lbs');
    const byField: Record<string, string> = {};

    if (appliedRawLbs !== null && intakeLbs !== null && appliedRawLbs > intakeLbs) {
        byField.applied_raw_lbs = APPLIED_OVER_INTAKE_MESSAGE;
    }

    if (appliedRawLbs !== null && (trimmedLbs !== null || overripeLbs !== null) && (trimmedLbs ?? 0) + (overripeLbs ?? 0) > appliedRawLbs) {
        byField[trimmedLbs !== null ? 'trimmed_lbs' : 'overripe_lbs'] = TRIMMED_OVER_APPLIED_MESSAGE;
    }

    return Object.keys(byField).length > 0 ? { byField, general: [] } : null;
}
