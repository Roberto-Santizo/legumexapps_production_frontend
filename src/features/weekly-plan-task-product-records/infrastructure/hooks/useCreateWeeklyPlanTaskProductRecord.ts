import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import type { PerformanceRecordFormErrors, PerformanceRecordValues } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { invalidateProductRecordQueries, useProductRecordErrorHandler, weeklyPlanTaskProductRecordProvider } from "@/features/weekly-plan-task-product-records/weekly-plan-task-product-records";

type Options = {
    weeklyPlanTaskId: string;
    onSuccess: () => void;
    onFormErrors: (errors: PerformanceRecordFormErrors) => void;
}

export function useCreateWeeklyPlanTaskProductRecord({ weeklyPlanTaskId, onSuccess, onFormErrors }: Options) {
    const notification = useNotification();
    const queryClient = useQueryClient();
    const handleError = useProductRecordErrorHandler(weeklyPlanTaskId, onFormErrors);

    const { mutate, isPending } = useMutation({
        mutationFn: (values: PerformanceRecordValues) =>
            weeklyPlanTaskProductRecordProvider.createWeeklyPlanTaskProductRecord({ weekly_plan_task_id: Number(weeklyPlanTaskId), values }),
        onSuccess: (message) => {
            notification.success(message);
            invalidateProductRecordQueries(queryClient, weeklyPlanTaskId);
            onSuccess();
        },
        onError: handleError
    });

    return { createRecord: mutate, isCreating: isPending };
}
