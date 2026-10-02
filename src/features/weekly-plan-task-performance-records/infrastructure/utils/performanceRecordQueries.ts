import type { QueryClient } from "@tanstack/react-query";

export const performanceRecordsQueryKey = (weeklyPlanTaskId: string) => ['getWeeklyPlanTaskPerformanceRecords', weeklyPlanTaskId];

export const performanceRecordQueryKey = (recordId: string) => ['getWeeklyPlanTaskPerformanceRecordById', recordId];

export const weeklyPlanTaskQueryKey = (weeklyPlanTaskId: string) => ['getWeeklyPlanTaskById', weeklyPlanTaskId];

export function invalidatePerformanceRecordQueries(queryClient: QueryClient, weeklyPlanTaskId: string) {
    queryClient.invalidateQueries({ queryKey: performanceRecordsQueryKey(weeklyPlanTaskId) });
    queryClient.invalidateQueries({ queryKey: weeklyPlanTaskQueryKey(weeklyPlanTaskId) });
    queryClient.invalidateQueries({ queryKey: ['getWeeklyPlanTasksByLineDate'] });
}
