import { useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { invalidatePerformanceRecordQueries, isDuplicatePalletError, isTaskNotInProgressError } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

export function usePerformanceRecordErrorHandler(weeklyPlanTaskId: string, onDuplicatePallet?: (message: string) => void) {
    const notification = useNotification();
    const queryClient = useQueryClient();

    return (message: string) => {
        if (onDuplicatePallet && isDuplicatePalletError(message)) {
            onDuplicatePallet(message);
            return;
        }

        notification.error(message);

        if (isTaskNotInProgressError(message)) invalidatePerformanceRecordQueries(queryClient, weeklyPlanTaskId);
    };
}
