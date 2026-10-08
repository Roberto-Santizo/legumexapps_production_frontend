import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { invalidateWeeklyPlanTaskTimeoutQueries, useWeeklyPlanTaskTimeoutErrorHandler, weeklyPlanTaskTimeoutProvider, type WeeklyPlanTaskTimeoutForm } from "@/features/weekly-plan-task-timeouts/weekly-plan-task-timeouts";

type Options = {
    timeoutId: string;
    weeklyPlanTaskId: string;
    onSuccess: () => void;
}

export function useUpdateWeeklyPlanTaskTimeout({ timeoutId, weeklyPlanTaskId, onSuccess }: Options) {
    const notification = useNotification();
    const queryClient = useQueryClient();
    const handleError = useWeeklyPlanTaskTimeoutErrorHandler(weeklyPlanTaskId);

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: WeeklyPlanTaskTimeoutForm) => weeklyPlanTaskTimeoutProvider.updateWeeklyPlanTaskTimeoutById(timeoutId, payload),
        onSuccess: (message) => {
            notification.success(message);
            invalidateWeeklyPlanTaskTimeoutQueries(queryClient, weeklyPlanTaskId);
            onSuccess();
        },
        onError: (err) => handleError(err.message)
    });

    return { updateTimeout: mutate, isUpdating: isPending };
}
