import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { invalidatePerformanceQueries, performanceProvider, type Performance } from "@/features/performances/performances";

type Options = {
    onSuccess?: () => void;
}

export function useDeletePerformance({ onSuccess }: Options = {}) {
    const notification = useNotification();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (id: number) => performanceProvider.deletePerformanceById(`${id}`),
        onSuccess: (message) => {
            notification.success(message);
            invalidatePerformanceQueries(queryClient);
            onSuccess?.();
        },
        onError: (err) => notification.error(err.message)
    });

    const handleDeletePerformance = (performance: Pick<Performance, 'id' | 'sku' | 'line'>) =>
        notification.question(`¿Desea eliminar el SKU ${performance.sku} de ${performance.line}?`, 'Eliminar', 'Se eliminará el rendimiento junto con su configuración', () => mutate(performance.id));

    return { handleDeletePerformance, isDeleting: isPending };
}
