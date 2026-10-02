import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { invalidatePerformanceRecordQueries, performanceRecordQueryKey, usePerformanceRecordErrorHandler, weeklyPlanTaskPerformanceRecordProvider, type WeeklyPlanTaskPerformanceRecordForm } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

type Options = {
    recordId: string;
    weeklyPlanTaskId: string;
    onSuccess: () => void;
    onDuplicatePallet: (message: string) => void;
}

export function useUpdateWeeklyPlanTaskPerformanceRecord({ recordId, weeklyPlanTaskId, onSuccess, onDuplicatePallet }: Options) {
    const notification = useNotification();
    const queryClient = useQueryClient();
    const handleError = usePerformanceRecordErrorHandler(weeklyPlanTaskId, onDuplicatePallet);

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: WeeklyPlanTaskPerformanceRecordForm) =>
            weeklyPlanTaskPerformanceRecordProvider.updateWeeklyPlanTaskPerformanceRecordById(recordId, payload),
        onSuccess: (message) => {
            notification.success(message);
            invalidatePerformanceRecordQueries(queryClient, weeklyPlanTaskId);
            queryClient.invalidateQueries({ queryKey: performanceRecordQueryKey(recordId) });
            onSuccess();
        },
        onError: (err) => handleError(err.message)
    });

    return { updateRecord: mutate, isUpdating: isPending };
}
