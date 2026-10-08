import { useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { invalidateWeeklyPlanTaskTimeoutQueries, isStaleTimeoutStateError } from "@/features/weekly-plan-task-timeouts/weekly-plan-task-timeouts";

export function useWeeklyPlanTaskTimeoutErrorHandler(weeklyPlanTaskId: string) {
    const notification = useNotification();
    const queryClient = useQueryClient();

    return (message: string) => {
        notification.error(message);

        if (isStaleTimeoutStateError(message)) invalidateWeeklyPlanTaskTimeoutQueries(queryClient, weeklyPlanTaskId);
    };
}
