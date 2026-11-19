import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { formatBulkActivityMessage, invalidateTaskEmployeeQueries, toPendingMoves, weeklyPlanTaskEmployeeProvider, type PendingActivityMove } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

const NO_MOVES: PendingActivityMove[] = [];

export function useUpdateTaskEmployeeActivity(taskId: string) {
    const notification = useNotification();
    const queryClient = useQueryClient();

    const { mutate, isPending, variables } = useMutation({
        mutationFn: (moves: PendingActivityMove[]) => Promise.all(
            moves.map(({ id, lineActivityId }) =>
                weeklyPlanTaskEmployeeProvider.updateWeeklyPlanTaskEmployeeActivityById(`${id}`, { line_activity_id: lineActivityId })
            )
        ),
        onSuccess: (messages) => {
            notification.success(formatBulkActivityMessage(messages));
            return invalidateTaskEmployeeQueries(queryClient, taskId);
        },
        onError: (err) => {
            notification.error(err.message);
            return invalidateTaskEmployeeQueries(queryClient, taskId);
        }
    });

    const updateActivities = (keys: string[], lineActivityId: number) => mutate(toPendingMoves(keys, lineActivityId));

    return { updateActivities, isUpdating: isPending, pendingMoves: isPending && variables ? variables : NO_MOVES };
}
