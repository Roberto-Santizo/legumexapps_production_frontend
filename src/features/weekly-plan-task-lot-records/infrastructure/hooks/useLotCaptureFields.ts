import { toPerformanceRecordColumns, useLineCaptureFields } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { DEFAULT_LOT_RECORD_COLUMNS } from "@/features/weekly-plan-task-lot-records/weekly-plan-task-lot-records";

export function useLotCaptureFields(lineCode: string, enabled = true) {
    const capture = useLineCaptureFields(lineCode, 'lot', enabled);

    return { ...capture, columns: toPerformanceRecordColumns(capture.fields, DEFAULT_LOT_RECORD_COLUMNS) };
}
