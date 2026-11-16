import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { invalidateTaskEmployeeQueries, weeklyPlanTaskEmployeeProvider } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Options = {
    taskId: string;
    onSuccess?: () => void;
}

export function useUpdateTaskEmployeeActivity({ taskId, onSuccess }: Options) {
    const notification = useNotification();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: ({ id, lineActivityId }: { id: number; lineActivityId: number }) =>
            weeklyPlanTaskEmployeeProvider.updateWeeklyPlanTaskEmployeeActivityById(`${id}`, { line_activity_id: lineActivityId }),
        onSuccess: (message) => {
            notification.success(message);
            invalidateTaskEmployeeQueries(queryClient, taskId);
            onSuccess?.();
        },
        onError: (err) => {
            notification.error(err.message);
            invalidateTaskEmployeeQueries(queryClient, taskId);
        }
    });

    const updateActivity = (id: number, lineActivityId: number) => mutate({ id, lineActivityId });

    return { updateActivity, isUpdating: isPending };
}
