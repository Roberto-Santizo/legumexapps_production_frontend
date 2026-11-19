import type { QueryClient } from "@tanstack/react-query";
import { lineByCodeQueryKey } from "@/features/lines/lines";

export const lineActivitiesQueryKey = (lineCode: string) => ['getLineActivities', lineCode];

export function invalidateLineActivityQueries(queryClient: QueryClient, lineCode: string) {
    queryClient.invalidateQueries({ queryKey: lineActivitiesQueryKey(lineCode) });
    queryClient.invalidateQueries({ queryKey: lineByCodeQueryKey(lineCode) });
}
