import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { invalidateProductRecordQueries, useProductRecordErrorHandler, weeklyPlanTaskProductRecordProvider } from "@/features/weekly-plan-task-product-records/weekly-plan-task-product-records";

export function useDeleteWeeklyPlanTaskProductRecord(weeklyPlanTaskId: string) {
    const notification = useNotification();
    const queryClient = useQueryClient();
    const handleError = useProductRecordErrorHandler(weeklyPlanTaskId);

    const { mutate, isPending } = useMutation({
        mutationFn: (recordId: string) => weeklyPlanTaskProductRecordProvider.deleteWeeklyPlanTaskProductRecordById(recordId),
        onSuccess: (message) => {
            notification.success(message);
            invalidateProductRecordQueries(queryClient, weeklyPlanTaskId);
        },
        onError: handleError
    });

    const handleDeleteRecord = (recordId: string) =>
        notification.question('¿Desea eliminar el producto?', 'Eliminar', 'El registro del producto se eliminará de forma definitiva', () => mutate(recordId));

    return { handleDeleteRecord, isDeleting: isPending };
}
