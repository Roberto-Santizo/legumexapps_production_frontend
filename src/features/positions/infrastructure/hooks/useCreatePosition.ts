import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { invalidatePositionQueries, positionProvider, type PositionForm } from "@/features/positions/positions";

type Options = {
    lineId: number;
    lineCode: string;
    onSuccess?: () => void;
}

export function useCreatePosition({ lineId, lineCode, onSuccess }: Options) {
    const notification = useNotification();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (form: PositionForm) => positionProvider.createPosition({ ...form, line_id: lineId }),
        onSuccess: (message) => {
            notification.success(message);
            invalidatePositionQueries(queryClient, lineCode);
            onSuccess?.();
        },
        onError: (err) => notification.error(err.message)
    });

    return { createPosition: mutate, isCreating: isPending };
}
