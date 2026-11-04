import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import type { PerformanceRecordFormErrors, PerformanceRecordValues } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { invalidateLotRecordQueries, lotRecordQueryKey, useLotRecordErrorHandler, weeklyPlanTaskLotRecordProvider } from "@/features/weekly-plan-task-lot-records/weekly-plan-task-lot-records";

type Options = {
    recordId: string;
    weeklyPlanTaskId: string;
    onSuccess: () => void;
    onFormErrors: (errors: PerformanceRecordFormErrors) => void;
}

export function useUpdateWeeklyPlanTaskLotRecord({ recordId, weeklyPlanTaskId, onSuccess, onFormErrors }: Options) {
    const notification = useNotification();
    const queryClient = useQueryClient();
    const handleError = useLotRecordErrorHandler(weeklyPlanTaskId, onFormErrors);

    const { mutate, isPending } = useMutation({
        mutationFn: (values: PerformanceRecordValues) =>
            weeklyPlanTaskLotRecordProvider.updateWeeklyPlanTaskLotRecordById(recordId, { values }),
        onSuccess: (message) => {
            notification.success(message);
            invalidateLotRecordQueries(queryClient, weeklyPlanTaskId);
            queryClient.invalidateQueries({ queryKey: lotRecordQueryKey(recordId) });
            onSuccess();
        },
        onError: handleError
    });

    return { updateRecord: mutate, isUpdating: isPending };
}
