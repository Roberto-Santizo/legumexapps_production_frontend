import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { invalidatePerformanceRecordQueries, performanceRecordQueryKey, usePerformanceRecordErrorHandler, weeklyPlanTaskPerformanceRecordProvider, type PerformanceRecordFormErrors, type PerformanceRecordValues } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

type Options = {
    recordId: string;
    weeklyPlanTaskId: string;
    onSuccess: () => void;
    onFormErrors: (errors: PerformanceRecordFormErrors) => void;
}

export function useUpdateWeeklyPlanTaskPerformanceRecord({ recordId, weeklyPlanTaskId, onSuccess, onFormErrors }: Options) {
    const notification = useNotification();
    const queryClient = useQueryClient();
    const handleError = usePerformanceRecordErrorHandler(weeklyPlanTaskId, onFormErrors);

    const { mutate, isPending } = useMutation({
        mutationFn: (values: PerformanceRecordValues) =>
            weeklyPlanTaskPerformanceRecordProvider.updateWeeklyPlanTaskPerformanceRecordById(recordId, { values }),
        onSuccess: (message) => {
            notification.success(message);
            invalidatePerformanceRecordQueries(queryClient, weeklyPlanTaskId);
            queryClient.invalidateQueries({ queryKey: performanceRecordQueryKey(recordId) });
            onSuccess();
        },
        onError: handleError
    });

    return { updateRecord: mutate, isUpdating: isPending };
}
