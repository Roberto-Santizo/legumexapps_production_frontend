import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { invalidateLineFieldQueries, lineFieldsProvider, type UpdateLineFieldPayload } from "@/features/line-fields/line-fields";

type Options = {
    lineCode: string;
    onSuccess?: () => void;
}

export function useUpdateLineField({ lineCode, onSuccess }: Options) {
    const notification = useNotification();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: UpdateLineFieldPayload }) =>
            lineFieldsProvider.updateLineFieldById(`${id}`, payload),
        onSuccess: (message) => {
            notification.success(message);
            invalidateLineFieldQueries(queryClient, lineCode);
            onSuccess?.();
        },
        onError: (err) => notification.error(err.message)
    });

    const updateField = (id: number, payload: UpdateLineFieldPayload) => mutate({ id, payload });

    return { updateField, isUpdating: isPending };
}
