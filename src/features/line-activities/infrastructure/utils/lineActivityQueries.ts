import type { QueryClient } from "@tanstack/react-query";
import { invalidatePerformanceQueries } from "@/features/performances/performances";

export const lineActivitiesQueryKey = (lineSkuId: number) => ['getLineSkuActivities', lineSkuId];

export function invalidateLineActivityQueries(queryClient: QueryClient, lineSkuId: number) {
    queryClient.invalidateQueries({ queryKey: lineActivitiesQueryKey(lineSkuId) });
    invalidatePerformanceQueries(queryClient);
}
