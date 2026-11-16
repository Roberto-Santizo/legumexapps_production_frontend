import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { invalidateTaskEmployeeQueries, weeklyPlanTaskEmployeeProvider, type PendingActivityMove } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

export function useUpdateTaskEmployeeActivity(taskId: string) {
    const notification = useNotification();
    const queryClient = useQueryClient();

    const { mutate, isPending, variables } = useMutation({
        mutationFn: ({ id, lineActivityId }: PendingActivityMove) =>
            weeklyPlanTaskEmployeeProvider.updateWeeklyPlanTaskEmployeeActivityById(`${id}`, { line_activity_id: lineActivityId }),
        onSuccess: (message) => {
            notification.success(message);
            return invalidateTaskEmployeeQueries(queryClient, taskId);
        },
        onError: (err) => {
            notification.error(err.message);
            return invalidateTaskEmployeeQueries(queryClient, taskId);
        }
    });

    const updateActivity = (id: number, lineActivityId: number) => mutate({ id, lineActivityId });

    return { updateActivity, isUpdating: isPending, pendingMove: isPending ? variables : undefined };
}
