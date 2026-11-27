import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { invalidateLineActivityQueries, lineActivitiesProvider, type AssignLineActivityPayload } from "@/features/line-activities/line-activities";

type Options = {
    lineSkuId: number;
    onSuccess?: () => void;
}

export function useAssignLineActivity({ lineSkuId, onSuccess }: Options) {
    const notification = useNotification();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: AssignLineActivityPayload) => lineActivitiesProvider.assignLineActivity(lineSkuId, payload),
        onSuccess: (message) => {
            notification.success(message);
            invalidateLineActivityQueries(queryClient, lineSkuId);
            onSuccess?.();
        },
        onError: (err) => notification.error(err.message)
    });

    return { assignActivity: mutate, isAssigning: isPending };
}
