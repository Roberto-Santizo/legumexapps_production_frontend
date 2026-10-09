import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { invalidatePerformanceRecordQueries, usePerformanceRecordErrorHandler, weeklyPlanTaskPerformanceRecordProvider, type PerformanceRecordFormErrors, type PerformanceRecordValues } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

type Options = {
    weeklyPlanTaskId: string;
    onSuccess: () => void;
    onFormErrors: (errors: PerformanceRecordFormErrors) => void;
}

export function useCreateWeeklyPlanTaskPerformanceRecord({ weeklyPlanTaskId, onSuccess, onFormErrors }: Options) {
    const notification = useNotification();
    const queryClient = useQueryClient();
    const handleError = usePerformanceRecordErrorHandler(weeklyPlanTaskId, onFormErrors);

    const { mutate, isPending } = useMutation({
        mutationFn: (values: PerformanceRecordValues) =>
            weeklyPlanTaskPerformanceRecordProvider.createWeeklyPlanTaskPerformanceRecord({ weekly_plan_task_id: Number(weeklyPlanTaskId), values }),
        onSuccess: (message) => {
            notification.success(message);
            invalidatePerformanceRecordQueries(queryClient, weeklyPlanTaskId);
            onSuccess();
        },
        onError: handleError
    });

    return { createRecord: mutate, isCreating: isPending };
}
