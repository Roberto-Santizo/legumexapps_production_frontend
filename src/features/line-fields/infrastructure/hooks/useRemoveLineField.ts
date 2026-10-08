import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { invalidateLineFieldQueries, lineFieldsProvider, type LineField } from "@/features/line-fields/line-fields";

export function useRemoveLineField(lineCode: string) {
    const notification = useNotification();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (id: number) => lineFieldsProvider.deleteLineFieldById(`${id}`),
        onSuccess: (message) => {
            notification.success(message);
            invalidateLineFieldQueries(queryClient, lineCode);
        },
        onError: (err) => notification.error(err.message)
    });

    const handleRemoveField = (field: LineField) =>
        notification.question(`¿Desea quitar ${field.label} de la línea?`, 'Quitar', 'El campo sigue en el catálogo y puede asignarse de nuevo', () => mutate(field.id));

    return { handleRemoveField, isRemoving: isPending };
}
