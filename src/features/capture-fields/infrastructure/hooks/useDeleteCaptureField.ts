import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { captureFieldsProvider, type CaptureField } from "@/features/capture-fields/capture-fields";

export function useDeleteCaptureField(onSuccess?: () => void) {
    const notification = useNotification();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (id: string) => captureFieldsProvider.deleteCaptureFieldById(id),
        onSuccess: (message) => {
            notification.success(message);
            queryClient.invalidateQueries({ queryKey: ['getCaptureFields'] });
            onSuccess?.();
        },
        onError: (err) => notification.error(err.message)
    });

    const handleDeleteCaptureField = (field: CaptureField) =>
        notification.question(`¿Desea eliminar el campo ${field.label}?`, 'Eliminar', 'El campo se eliminará del catálogo de forma definitiva', () => mutate(`${field.id}`));

    return { handleDeleteCaptureField, isDeleting: isPending };
}
