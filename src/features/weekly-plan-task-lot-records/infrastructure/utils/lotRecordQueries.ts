import type { QueryClient } from "@tanstack/react-query";
import { weeklyPlanTaskQueryKey } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

export const lotRecordsQueryKey = (weeklyPlanTaskId: string) => ['getWeeklyPlanTaskLotRecords', weeklyPlanTaskId];

export const lotRecordQueryKey = (recordId: string) => ['getWeeklyPlanTaskLotRecordById', recordId];

export function invalidateLotRecordQueries(queryClient: QueryClient, weeklyPlanTaskId: string) {
    queryClient.invalidateQueries({ queryKey: lotRecordsQueryKey(weeklyPlanTaskId) });
    queryClient.invalidateQueries({ queryKey: weeklyPlanTaskQueryKey(weeklyPlanTaskId) });
    queryClient.invalidateQueries({ queryKey: ['getWeeklyPlanTasksByLineDate'] });
}
