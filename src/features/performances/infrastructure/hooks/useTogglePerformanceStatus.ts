import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { invalidatePerformanceQueries, performanceProvider } from "@/features/performances/performances";

export function useTogglePerformanceStatus() {
    const notification = useNotification();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (id: number) => performanceProvider.toggleStatus(`${id}`),
        onSuccess: (message) => {
            notification.success(message);
            invalidatePerformanceQueries(queryClient);
        },
        onError: (err) => notification.error(err.message)
    });

    return { toggleStatus: mutate, isToggling: isPending };
}
