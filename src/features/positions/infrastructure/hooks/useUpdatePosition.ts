import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { invalidatePositionQueries, positionProvider, type PositionForm } from "@/features/positions/positions";

type Options = {
    lineSkuId: number;
    onSuccess?: () => void;
}

type Variables = {
    id: string;
    form: PositionForm;
}

export function useUpdatePosition({ lineSkuId, onSuccess }: Options) {
    const notification = useNotification();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: ({ id, form }: Variables) => positionProvider.updatePositionById(id, { ...form, line_sku_id: lineSkuId }),
        onSuccess: (message) => {
            notification.success(message);
            invalidatePositionQueries(queryClient, lineSkuId);
            onSuccess?.();
        },
        onError: (err) => notification.error(err.message)
    });

    const updatePosition = (id: string, form: PositionForm) => mutate({ id, form });

    return { updatePosition, isUpdating: isPending };
}
