import { toPerformanceRecordColumns, useLineCaptureFields } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { DEFAULT_PRODUCT_RECORD_COLUMNS } from "@/features/weekly-plan-task-product-records/weekly-plan-task-product-records";

export function useProductCaptureFields(lineCode: string, enabled = true) {
    const capture = useLineCaptureFields(lineCode, 'product', enabled);

    return { ...capture, columns: toPerformanceRecordColumns(capture.fields, DEFAULT_PRODUCT_RECORD_COLUMNS) };
}
