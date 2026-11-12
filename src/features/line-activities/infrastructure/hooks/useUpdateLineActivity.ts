import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { invalidateLineActivityQueries, lineActivitiesProvider, type UpdateLineActivityPayload } from "@/features/line-activities/line-activities";

type Options = {
    lineCode: string;
    onSuccess?: () => void;
}

export function useUpdateLineActivity({ lineCode, onSuccess }: Options) {
    const notification = useNotification();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: UpdateLineActivityPayload }) =>
            lineActivitiesProvider.updateLineActivityById(`${id}`, payload),
        onSuccess: (message) => {
            notification.success(message);
            invalidateLineActivityQueries(queryClient, lineCode);
            onSuccess?.();
        },
        onError: (err) => notification.error(err.message)
    });

    const updateQuantity = (id: number, quantity: number) => mutate({ id, payload: { quantity } });

    return { updateQuantity, isUpdating: isPending };
}
