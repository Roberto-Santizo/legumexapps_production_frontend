import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { invalidatePerformanceRecordQueries, usePerformanceRecordErrorHandler, weeklyPlanTaskPerformanceRecordProvider, type WeeklyPlanTaskPerformanceRecordForm } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

type Options = {
    weeklyPlanTaskId: string;
    onSuccess: () => void;
    onDuplicatePallet: (message: string) => void;
}

export function useCreateWeeklyPlanTaskPerformanceRecord({ weeklyPlanTaskId, onSuccess, onDuplicatePallet }: Options) {
    const notification = useNotification();
    const queryClient = useQueryClient();
    const handleError = usePerformanceRecordErrorHandler(weeklyPlanTaskId, onDuplicatePallet);

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: WeeklyPlanTaskPerformanceRecordForm) =>
            weeklyPlanTaskPerformanceRecordProvider.createWeeklyPlanTaskPerformanceRecord({ ...payload, weekly_plan_task_id: Number(weeklyPlanTaskId) }),
        onSuccess: (message) => {
            notification.success(message);
            invalidatePerformanceRecordQueries(queryClient, weeklyPlanTaskId);
            onSuccess();
        },
        onError: (err) => handleError(err.message)
    });

    return { createRecord: mutate, isCreating: isPending };
}
