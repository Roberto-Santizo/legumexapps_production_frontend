import type { QueryClient } from "@tanstack/react-query";
import { invalidatePerformanceQueries } from "@/features/performances/performances";

export const positionsByLineSkuQueryKey = (lineSkuId: number) => ['getPositionsByLineSku', lineSkuId];

export const positionByIdQueryKey = (id: string) => ['getPositionById', id];

export function invalidatePositionQueries(queryClient: QueryClient, lineSkuId: number) {
    queryClient.invalidateQueries({ queryKey: positionsByLineSkuQueryKey(lineSkuId) });
    queryClient.invalidateQueries({ queryKey: ['getPositionById'] });
    queryClient.invalidateQueries({ queryKey: ['getPositions'] });
    invalidatePerformanceQueries(queryClient);
}
