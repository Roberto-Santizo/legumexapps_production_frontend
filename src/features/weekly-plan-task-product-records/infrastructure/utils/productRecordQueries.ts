import type { QueryClient } from "@tanstack/react-query";
import { weeklyPlanTaskQueryKey } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

export const productRecordsQueryKey = (weeklyPlanTaskId: string) => ['getWeeklyPlanTaskProductRecords', weeklyPlanTaskId];

export const productRecordQueryKey = (recordId: string) => ['getWeeklyPlanTaskProductRecordById', recordId];

export function invalidateProductRecordQueries(queryClient: QueryClient, weeklyPlanTaskId: string) {
    queryClient.invalidateQueries({ queryKey: productRecordsQueryKey(weeklyPlanTaskId) });
    queryClient.invalidateQueries({ queryKey: weeklyPlanTaskQueryKey(weeklyPlanTaskId) });
    queryClient.invalidateQueries({ queryKey: ['getWeeklyPlanTasksByLineDate'] });
}
