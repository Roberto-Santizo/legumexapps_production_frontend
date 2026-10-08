import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { invalidateWeeklyPlanTaskTimeoutQueries, useWeeklyPlanTaskTimeoutErrorHandler, weeklyPlanTaskTimeoutProvider } from "@/features/weekly-plan-task-timeouts/weekly-plan-task-timeouts";

export function useDeleteWeeklyPlanTaskTimeout(weeklyPlanTaskId: string) {
    const notification = useNotification();
    const queryClient = useQueryClient();
    const handleError = useWeeklyPlanTaskTimeoutErrorHandler(weeklyPlanTaskId);

    const { mutate, isPending } = useMutation({
        mutationFn: (timeoutId: string) => weeklyPlanTaskTimeoutProvider.deleteWeeklyPlanTaskTimeoutById(timeoutId),
        onSuccess: (message) => {
            notification.success(message);
            invalidateWeeklyPlanTaskTimeoutQueries(queryClient, weeklyPlanTaskId);
        },
        onError: (err) => handleError(err.message)
    });

    const handleDeleteTimeout = (timeoutId: string) =>
        notification.question('¿Desea eliminar el tiempo muerto?', 'Eliminar', 'El tiempo muerto se eliminará de forma definitiva', () => mutate(timeoutId));

    return { handleDeleteTimeout, isDeleting: isPending };
}
