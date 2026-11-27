import type { QueryClient } from "@tanstack/react-query";

export const performancesQueryKey = ['getPerformances'];

export const linePerformancesQueryKey = (lineCode: string) => [...performancesQueryKey, 'line', lineCode];

export const performanceByIdQueryKey = (id: string) => ['getPerformanceById', id];

export function invalidatePerformanceQueries(queryClient: QueryClient) {
    queryClient.invalidateQueries({ queryKey: performancesQueryKey });
    queryClient.invalidateQueries({ queryKey: ['getPerformanceById'] });
}
