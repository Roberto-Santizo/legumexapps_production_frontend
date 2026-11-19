import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { invalidateTaskEmployeeQueries, weeklyPlanTaskEmployeeProvider, type WeeklyPlanTaskEmployee } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

export function useRemoveTaskEmployee(taskId: string) {
    const notification = useNotification();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (id: number) => weeklyPlanTaskEmployeeProvider.deleteWeeklyPlanTaskEmployeeById(`${id}`),
        onSuccess: (message) => {
            notification.success(message);
            invalidateTaskEmployeeQueries(queryClient, taskId);
        },
        onError: (err) => {
            notification.error(err.message);
            invalidateTaskEmployeeQueries(queryClient, taskId);
        }
    });

    const handleRemove = (assignment: WeeklyPlanTaskEmployee) => notification.question(
        `¿Desea retirar a ${assignment.name} de la tarea?`,
        'Retirar',
        'Su lugar en la actividad queda libre y la asignación pasa al historial de la tarea',
        () => mutate(assignment.id)
    );

    return { handleRemove, isRemoving: isPending };
}
