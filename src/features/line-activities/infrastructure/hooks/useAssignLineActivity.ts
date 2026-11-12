import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { invalidateLineActivityQueries, lineActivitiesProvider, type AssignLineActivityPayload } from "@/features/line-activities/line-activities";

type Options = {
    lineCode: string;
    onSuccess?: () => void;
}

export function useAssignLineActivity({ lineCode, onSuccess }: Options) {
    const notification = useNotification();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: AssignLineActivityPayload) => lineActivitiesProvider.assignLineActivity(lineCode, payload),
        onSuccess: (message) => {
            notification.success(message);
            invalidateLineActivityQueries(queryClient, lineCode);
            onSuccess?.();
        },
        onError: (err) => notification.error(err.message)
    });

    return { assignActivity: mutate, isAssigning: isPending };
}
