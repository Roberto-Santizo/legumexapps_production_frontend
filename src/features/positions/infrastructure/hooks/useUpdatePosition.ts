import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { invalidatePositionQueries, positionProvider, type PositionForm } from "@/features/positions/positions";

type Options = {
    lineId: number;
    lineCode: string;
    onSuccess?: () => void;
}

type Variables = {
    id: string;
    form: PositionForm;
}

export function useUpdatePosition({ lineId, lineCode, onSuccess }: Options) {
    const notification = useNotification();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: ({ id, form }: Variables) => positionProvider.updatePositionById(id, { ...form, line_id: lineId }),
        onSuccess: (message) => {
            notification.success(message);
            invalidatePositionQueries(queryClient, lineCode);
            onSuccess?.();
        },
        onError: (err) => notification.error(err.message)
    });

    const updatePosition = (id: string, form: PositionForm) => mutate({ id, form });

    return { updatePosition, isUpdating: isPending };
}
