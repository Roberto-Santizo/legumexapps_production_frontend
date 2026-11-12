import type { QueryClient } from "@tanstack/react-query";

export const lineActivitiesQueryKey = (lineCode: string) => ['getLineActivities', lineCode];

export function invalidateLineActivityQueries(queryClient: QueryClient, lineCode: string) {
    queryClient.invalidateQueries({ queryKey: lineActivitiesQueryKey(lineCode) });
}
