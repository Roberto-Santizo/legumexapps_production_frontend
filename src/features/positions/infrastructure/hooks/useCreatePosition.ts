import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { invalidatePositionQueries, positionProvider, type PositionForm } from "@/features/positions/positions";

type Options = {
    lineSkuId: number;
    onSuccess?: () => void;
}

export function useCreatePosition({ lineSkuId, onSuccess }: Options) {
    const notification = useNotification();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (form: PositionForm) => positionProvider.createPosition({ ...form, line_sku_id: lineSkuId }),
        onSuccess: (message) => {
            notification.success(message);
            invalidatePositionQueries(queryClient, lineSkuId);
            onSuccess?.();
        },
        onError: (err) => notification.error(err.message)
    });

    return { createPosition: mutate, isCreating: isPending };
}
