import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { activityProvider, invalidateActivityQueries, type Activity } from "@/features/activities/activities";

export function useDeleteActivity(onSuccess?: () => void) {
    const notification = useNotification();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (id: string) => activityProvider.deleteActivityById(id),
        onSuccess: (message) => {
            notification.success(message);
            invalidateActivityQueries(queryClient);
            onSuccess?.();
        },
        onError: (err) => notification.error(err.message)
    });

    const handleDeleteActivity = (activity: Activity) =>
        notification.question(`¿Desea eliminar la actividad ${activity.name}?`, 'Eliminar', 'Solo se pueden eliminar actividades que no estén asignadas a ninguna línea', () => mutate(`${activity.id}`));

    return { handleDeleteActivity, isDeleting: isPending };
}
