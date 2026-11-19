import type { QueryClient } from "@tanstack/react-query";
import { lineByCodeQueryKey } from "@/features/lines/lines";

export const positionsByLineQueryKey = (lineCode: string) => ['getPositionsByLineCode', lineCode];

export const positionByIdQueryKey = (id: string) => ['getPositionById', id];

export function invalidatePositionQueries(queryClient: QueryClient, lineCode: string) {
    queryClient.invalidateQueries({ queryKey: positionsByLineQueryKey(lineCode) });
    queryClient.invalidateQueries({ queryKey: ['getPositionById'] });
    queryClient.invalidateQueries({ queryKey: ['getPositions'] });
    queryClient.invalidateQueries({ queryKey: lineByCodeQueryKey(lineCode) });
}
