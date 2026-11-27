import { performanceByIdQueryKey, performanceProvider } from "@/features/performances/performances";
import { useQuery } from "@tanstack/react-query";

export function usePerformanceById(id: string) {
    return useQuery({
        queryKey: performanceByIdQueryKey(id),
        queryFn: () => performanceProvider.getPerformanceById(id),
        enabled: id !== '',
        retry: false
    });
}
