import { useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { invalidatePerformanceRecordQueries, isDuplicatePalletError, isTaskNotInProgressError, PerformanceRecordValidationError, splitPerformanceRecordErrors, type PerformanceRecordFormErrors } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

export function usePerformanceRecordErrorHandler(weeklyPlanTaskId: string, onFormErrors?: (errors: PerformanceRecordFormErrors) => void) {
    const notification = useNotification();
    const queryClient = useQueryClient();

    return (error: Error) => {
        if (onFormErrors && error instanceof PerformanceRecordValidationError) {
            onFormErrors(splitPerformanceRecordErrors(error.errors));
            return;
        }

        if (onFormErrors && isDuplicatePalletError(error.message)) {
            onFormErrors({ byField: { pallet_number: error.message }, general: [] });
            return;
        }

        notification.error(error.message);

        if (isTaskNotInProgressError(error.message)) invalidatePerformanceRecordQueries(queryClient, weeklyPlanTaskId);
    };
}
