import { defaultLineCaptureValues, toLineCaptureRecord, type LineCaptureFormValues, type LineField } from "@/features/line-fields/line-fields";
import { getRecordValue, type PalletValue, type PerformanceRecordValues, type WeeklyPlanTaskPerformanceRecord } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

const toFormValue = (field: LineField, value: PalletValue): string | boolean => {
    if (field.data_type === 'boolean') return Boolean(value);
    return value === null ? '' : String(value);
};

const normalizeStoredValue = (field: LineField, value: PalletValue): PalletValue =>
    field.data_type === 'boolean' ? Boolean(value) : value;

export const defaultRecordFormValues = (fields: LineField[], nextPalletNumber: number | null): LineCaptureFormValues => ({
    ...defaultLineCaptureValues(fields),
    ...(fields.some(field => field.key === 'pallet_number') && nextPalletNumber !== null ? { pallet_number: String(nextPalletNumber) } : {})
});

export const toRecordFormValues = (fields: LineField[], record: WeeklyPlanTaskPerformanceRecord): LineCaptureFormValues =>
    Object.fromEntries(fields.map(field => [field.key, toFormValue(field, getRecordValue(record, field.key))]));

export const toRecordValues = (fields: LineField[], values: LineCaptureFormValues): PerformanceRecordValues =>
    toLineCaptureRecord(fields, values);

export const changedRecordValues = (fields: LineField[], record: WeeklyPlanTaskPerformanceRecord, values: LineCaptureFormValues): PerformanceRecordValues =>
    Object.fromEntries(
        Object.entries(toRecordValues(fields, values)).filter(([key, value]) => {
            const field = fields.find(item => item.key === key)!;
            return value !== normalizeStoredValue(field, getRecordValue(record, key));
        })
    );
