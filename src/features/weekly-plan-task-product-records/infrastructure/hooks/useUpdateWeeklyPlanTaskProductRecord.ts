import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import type { PerformanceRecordFormErrors, PerformanceRecordValues } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { invalidateProductRecordQueries, productRecordQueryKey, useProductRecordErrorHandler, weeklyPlanTaskProductRecordProvider } from "@/features/weekly-plan-task-product-records/weekly-plan-task-product-records";

type Options = {
    recordId: string;
    weeklyPlanTaskId: string;
    onSuccess: () => void;
    onFormErrors: (errors: PerformanceRecordFormErrors) => void;
}

export function useUpdateWeeklyPlanTaskProductRecord({ recordId, weeklyPlanTaskId, onSuccess, onFormErrors }: Options) {
    const notification = useNotification();
    const queryClient = useQueryClient();
    const handleError = useProductRecordErrorHandler(weeklyPlanTaskId, onFormErrors);

    const { mutate, isPending } = useMutation({
        mutationFn: (values: PerformanceRecordValues) =>
            weeklyPlanTaskProductRecordProvider.updateWeeklyPlanTaskProductRecordById(recordId, { values }),
        onSuccess: (message) => {
            notification.success(message);
            invalidateProductRecordQueries(queryClient, weeklyPlanTaskId);
            queryClient.invalidateQueries({ queryKey: productRecordQueryKey(recordId) });
            onSuccess();
        },
        onError: handleError
    });

    return { updateRecord: mutate, isUpdating: isPending };
}
