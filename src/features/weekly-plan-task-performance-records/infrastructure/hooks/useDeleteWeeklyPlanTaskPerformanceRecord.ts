import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { invalidatePerformanceRecordQueries, usePerformanceRecordErrorHandler, weeklyPlanTaskPerformanceRecordProvider } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

export function useDeleteWeeklyPlanTaskPerformanceRecord(weeklyPlanTaskId: string) {
    const notification = useNotification();
    const queryClient = useQueryClient();
    const handleError = usePerformanceRecordErrorHandler(weeklyPlanTaskId);

    const { mutate, isPending } = useMutation({
        mutationFn: (recordId: string) => weeklyPlanTaskPerformanceRecordProvider.deleteWeeklyPlanTaskPerformanceRecordById(recordId),
        onSuccess: (message) => {
            notification.success(message);
            invalidatePerformanceRecordQueries(queryClient, weeklyPlanTaskId);
        },
        onError: handleError
    });

    const handleDeleteRecord = (recordId: string) =>
        notification.question('¿Desea eliminar la toma de rendimiento?', 'Eliminar', 'La toma se eliminará de forma definitiva', () => mutate(recordId));

    return { handleDeleteRecord, isDeleting: isPending };
}
