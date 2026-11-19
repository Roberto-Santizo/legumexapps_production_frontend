import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { invalidatePositionQueries, positionProvider, type Position } from "@/features/positions/positions";

type Options = {
    lineCode: string;
    onSuccess?: () => void;
}

export function useDeletePosition({ lineCode, onSuccess }: Options) {
    const notification = useNotification();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (id: number) => positionProvider.deletePositionById(`${id}`),
        onSuccess: (message) => {
            notification.success(message);
            invalidatePositionQueries(queryClient, lineCode);
            onSuccess?.();
        },
        onError: (err) => notification.error(err.message)
    });

    const handleDeletePosition = (position: Pick<Position, 'id' | 'code'>) =>
        notification.question(`¿Desea eliminar la posición ${position.code}?`, 'Eliminar', 'La posición dejará de estar disponible para asignar personal en esta línea', () => mutate(position.id));

    return { handleDeletePosition, isDeleting: isPending };
}
