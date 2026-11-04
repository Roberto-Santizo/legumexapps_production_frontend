import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import type { PerformanceRecordFormErrors, PerformanceRecordValues } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { invalidateLotRecordQueries, useLotRecordErrorHandler, weeklyPlanTaskLotRecordProvider } from "@/features/weekly-plan-task-lot-records/weekly-plan-task-lot-records";

type Options = {
    weeklyPlanTaskId: string;
    onSuccess: () => void;
    onFormErrors: (errors: PerformanceRecordFormErrors) => void;
}

export function useCreateWeeklyPlanTaskLotRecord({ weeklyPlanTaskId, onSuccess, onFormErrors }: Options) {
    const notification = useNotification();
    const queryClient = useQueryClient();
    const handleError = useLotRecordErrorHandler(weeklyPlanTaskId, onFormErrors);

    const { mutate, isPending } = useMutation({
        mutationFn: (values: PerformanceRecordValues) =>
            weeklyPlanTaskLotRecordProvider.createWeeklyPlanTaskLotRecord({ weekly_plan_task_id: Number(weeklyPlanTaskId), values }),
        onSuccess: (message) => {
            notification.success(message);
            invalidateLotRecordQueries(queryClient, weeklyPlanTaskId);
            onSuccess();
        },
        onError: handleError
    });

    return { createRecord: mutate, isCreating: isPending };
}
