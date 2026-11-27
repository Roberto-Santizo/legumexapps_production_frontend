import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { invalidatePositionQueries, positionProvider, type Position } from "@/features/positions/positions";

type Options = {
    lineSkuId: number;
    onSuccess?: () => void;
}

export function useDeletePosition({ lineSkuId, onSuccess }: Options) {
    const notification = useNotification();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (id: number) => positionProvider.deletePositionById(`${id}`),
        onSuccess: (message) => {
            notification.success(message);
            invalidatePositionQueries(queryClient, lineSkuId);
            onSuccess?.();
        },
        onError: (err) => notification.error(err.message)
    });

    const handleDeletePosition = (position: Pick<Position, 'id' | 'code'>) =>
        notification.question(`¿Desea eliminar la posición ${position.code}?`, 'Eliminar', 'La posición dejará de estar disponible para asignar personal en este SKU', () => mutate(position.id));

    return { handleDeletePosition, isDeleting: isPending };
}
