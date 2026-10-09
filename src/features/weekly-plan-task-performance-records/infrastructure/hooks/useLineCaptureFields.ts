import { useQuery } from "@tanstack/react-query";
import { lineFieldsProvider, lineFieldsQueryKey } from "@/features/line-fields/line-fields";
import { useLineByCode } from "@/features/lines/lines";
import type { RecordCaptureType } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

export function useLineCaptureFields(lineCode: string, captureType: RecordCaptureType, enabled = true) {
    const line = useLineByCode(lineCode, enabled);

    const lineFields = useQuery({
        queryKey: lineFieldsQueryKey(lineCode),
        queryFn: () => lineFieldsProvider.getLineFields(lineCode),
        enabled: enabled && !!lineCode,
        retry: false
    });

    const fields = lineFields.data ?? [];

    return {
        fields,
        inputFields: fields.filter(field => !field.is_calculated),
        calculatedFields: fields.filter(field => field.is_calculated),
        isCaptureLine: line.data ? line.data.capture_type === captureType : null,
        isLoading: line.isLoading || lineFields.isLoading,
        error: line.error ?? lineFields.error
    };
}
