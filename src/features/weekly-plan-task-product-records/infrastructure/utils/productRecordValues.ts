import { defaultLineCaptureValues, type LineCaptureFormValues, type LineField } from "@/features/line-fields/line-fields";
import { changedCaptureValues, toCaptureFormValues, type PerformanceRecordValues } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { getProductRecordValue, RAW_MATERIAL_MAX_LENGTH, type WeeklyPlanTaskProductRecord } from "@/features/weekly-plan-task-product-records/weekly-plan-task-product-records";

const hasRawMaterialField = (fields: LineField[]): boolean =>
    fields.some(field => field.key === 'raw_material' && field.data_type === 'text');

export const defaultProductRecordFormValues = (fields: LineField[], skuName: string): LineCaptureFormValues => ({
    ...defaultLineCaptureValues(fields),
    ...(hasRawMaterialField(fields) && skuName ? { raw_material: skuName.slice(0, RAW_MATERIAL_MAX_LENGTH) } : {})
});

export const toProductRecordFormValues = (fields: LineField[], record: WeeklyPlanTaskProductRecord): LineCaptureFormValues =>
    toCaptureFormValues(fields, key => getProductRecordValue(record, key));

export const changedProductRecordValues = (fields: LineField[], record: WeeklyPlanTaskProductRecord, values: LineCaptureFormValues): PerformanceRecordValues =>
    changedCaptureValues(fields, key => getProductRecordValue(record, key), values);
