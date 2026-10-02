import type { QueryClient } from "@tanstack/react-query";

export const weeklyPlanTaskTimeoutsQueryKey = (weeklyPlanTaskId: string) => ['getWeeklyPlanTaskTimeouts', weeklyPlanTaskId];

export const timeoutTaskQueryKey = (weeklyPlanTaskId: string) => ['getWeeklyPlanTaskById', weeklyPlanTaskId];

export function invalidateWeeklyPlanTaskTimeoutQueries(queryClient: QueryClient, weeklyPlanTaskId: string) {
    queryClient.invalidateQueries({ queryKey: weeklyPlanTaskTimeoutsQueryKey(weeklyPlanTaskId) });
    queryClient.invalidateQueries({ queryKey: timeoutTaskQueryKey(weeklyPlanTaskId) });
    queryClient.invalidateQueries({ queryKey: ['getWeeklyPlanTasksByLineDate'] });
}
