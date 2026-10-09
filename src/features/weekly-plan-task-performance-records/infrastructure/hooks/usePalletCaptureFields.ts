import { useQuery } from "@tanstack/react-query";
import { lineFieldsProvider, lineFieldsQueryKey } from "@/features/line-fields/line-fields";
import { linesRepositoryProvider } from "@/features/lines/lines";
import { toPerformanceRecordColumns } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

export function usePalletCaptureFields(lineCode: string, enabled = true) {
    const line = useQuery({
        queryKey: ['getLineByCode', lineCode],
        queryFn: () => linesRepositoryProvider.getLineByCode(lineCode),
        enabled: enabled && !!lineCode,
        retry: false
    });

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
        columns: toPerformanceRecordColumns(fields),
        isPalletLine: line.data ? line.data.capture_type === 'pallet' : null,
        isLoading: line.isLoading || lineFields.isLoading,
        error: line.error ?? lineFields.error
    };
}
