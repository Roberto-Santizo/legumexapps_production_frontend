import { getCurrentDate } from "@/features/shared/shared";
import { defaultLineCaptureValues, type LineCaptureFormValues, type LineField } from "@/features/line-fields/line-fields";
import { changedCaptureValues, toCaptureFormValues, type PerformanceRecordValues } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { getLotRecordValue, type WeeklyPlanTaskLotRecord } from "@/features/weekly-plan-task-lot-records/weekly-plan-task-lot-records";

const getCurrentTime = (): string => new Date().toTimeString().slice(0, 5);

const prefilledValue = (field: LineField): string | null => {
    if (field.key === 'entry_date' && field.data_type === 'date') return getCurrentDate();
    if (field.key === 'recorded_at' && field.data_type === 'time') return getCurrentTime();
    return null;
};

export const defaultLotRecordFormValues = (fields: LineField[]): LineCaptureFormValues => ({
    ...defaultLineCaptureValues(fields),
    ...Object.fromEntries(fields.flatMap(field => {
        const value = prefilledValue(field);
        return value !== null ? [[field.key, value]] : [];
    }))
});

export const toLotRecordFormValues = (fields: LineField[], record: WeeklyPlanTaskLotRecord): LineCaptureFormValues =>
    toCaptureFormValues(fields, key => getLotRecordValue(record, key));

export const changedLotRecordValues = (fields: LineField[], record: WeeklyPlanTaskLotRecord, values: LineCaptureFormValues): PerformanceRecordValues =>
    changedCaptureValues(fields, key => getLotRecordValue(record, key), values);
