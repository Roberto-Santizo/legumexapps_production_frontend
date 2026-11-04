import type { AxiosError } from "axios";
import { PerformanceRecordValidationError, type PerformanceRecordErrorResponse, type PerformanceRecordFormErrors } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

export const isDuplicatePalletError = (message: string) => /^La pallet \d+ ya fue registrada/.test(message);

export const isTaskNotInProgressError = (message: string) => message.startsWith('Solo se pueden registrar tomas de rendimiento');

export function toPerformanceRecordError(error: AxiosError<PerformanceRecordErrorResponse>): Error {
    const data = error.response?.data;

    if (error.response?.status === 422 && data?.errors) return new PerformanceRecordValidationError(data.message, data.errors);

    return new Error(data?.message);
}

export function splitPerformanceRecordErrors(errors: Record<string, string[]>): PerformanceRecordFormErrors {
    const byField: Record<string, string> = {};
    const general: string[] = [];

    for (const [key, messages] of Object.entries(errors)) {
        if (key.startsWith('values.')) byField[key.slice('values.'.length)] = messages[0];
        else general.push(...messages);
    }

    return { byField, general };
}

export function getGeneralFormErrors(formErrors: PerformanceRecordFormErrors | null, fieldKeys: string[]): string[] {
    if (!formErrors) return [];

    const orphanFieldErrors = Object.entries(formErrors.byField)
        .filter(([key]) => !fieldKeys.includes(key))
        .map(([, message]) => message);

    return [...formErrors.general, ...orphanFieldErrors];
}
