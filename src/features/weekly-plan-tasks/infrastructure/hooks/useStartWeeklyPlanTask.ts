import { useMutation } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { weeklyPlanTaskProvider } from "@/features/weekly-plan-tasks/weekly-plan-tasks";

export function useStartWeeklyPlanTask(refetch: () => void) {
    const notification = useNotification();

    const { mutate, isPending } = useMutation({
        mutationFn: (id: string) => weeklyPlanTaskProvider.startWeeklyPlanTask(id),
        onSuccess: (message) => {
            notification.success(message);
            refetch();
        },
        onError: (err) => {
            notification.error(err.message);
            refetch();
        }
    });

    const handleStartTask = (id: string) =>
        notification.question('¿Desea iniciar la tarea?', 'Iniciar', 'Se registrará la hora de inicio y la tarea pasará a En Progreso', () => mutate(id));

    return { handleStartTask, isStarting: isPending };
}
