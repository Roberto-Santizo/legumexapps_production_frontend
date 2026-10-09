import { toPerformanceRecordColumns, useLineCaptureFields } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

export function usePalletCaptureFields(lineCode: string, enabled = true) {
    const capture = useLineCaptureFields(lineCode, 'pallet', enabled);

    return { ...capture, columns: toPerformanceRecordColumns(capture.fields) };
}
