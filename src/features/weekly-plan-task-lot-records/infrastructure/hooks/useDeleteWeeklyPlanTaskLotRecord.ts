import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { invalidateLotRecordQueries, useLotRecordErrorHandler, weeklyPlanTaskLotRecordProvider } from "@/features/weekly-plan-task-lot-records/weekly-plan-task-lot-records";

export function useDeleteWeeklyPlanTaskLotRecord(weeklyPlanTaskId: string) {
    const notification = useNotification();
    const queryClient = useQueryClient();
    const handleError = useLotRecordErrorHandler(weeklyPlanTaskId);

    const { mutate, isPending } = useMutation({
        mutationFn: (recordId: string) => weeklyPlanTaskLotRecordProvider.deleteWeeklyPlanTaskLotRecordById(recordId),
        onSuccess: (message) => {
            notification.success(message);
            invalidateLotRecordQueries(queryClient, weeklyPlanTaskId);
        },
        onError: handleError
    });

    const handleDeleteRecord = (recordId: string) =>
        notification.question('¿Desea eliminar el lote?', 'Eliminar', 'El registro del lote se eliminará de forma definitiva', () => mutate(recordId));

    return { handleDeleteRecord, isDeleting: isPending };
}
