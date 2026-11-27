import { linePerformancesQueryKey, performanceProvider } from "@/features/performances/performances";
import { useQuery } from "@tanstack/react-query";

export function useLinePerformances(lineCode: string) {
    return useQuery({
        queryKey: linePerformancesQueryKey(lineCode),
        queryFn: () => performanceProvider.getPerformances('', '', undefined, lineCode),
        enabled: lineCode !== '',
        retry: false
    });
}
