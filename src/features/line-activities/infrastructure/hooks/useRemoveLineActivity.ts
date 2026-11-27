import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { invalidateLineActivityQueries, lineActivitiesProvider, type LineActivity } from "@/features/line-activities/line-activities";

export function useRemoveLineActivity(lineSkuId: number) {
    const notification = useNotification();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (id: number) => lineActivitiesProvider.deleteLineActivityById(`${id}`),
        onSuccess: (message) => {
            notification.success(message);
            invalidateLineActivityQueries(queryClient, lineSkuId);
        },
        onError: (err) => notification.error(err.message)
    });

    const handleRemoveActivity = (item: LineActivity) =>
        notification.question(`¿Desea quitar ${item.activity} del SKU?`, 'Quitar', 'La actividad sigue en el catálogo y puede asignarse de nuevo', () => mutate(item.id));

    return { handleRemoveActivity, isRemoving: isPending };
}
