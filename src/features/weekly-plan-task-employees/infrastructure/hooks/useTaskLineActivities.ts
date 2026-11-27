import { useQuery } from "@tanstack/react-query";
import { lineActivitiesProvider, lineActivitiesQueryKey } from "@/features/line-activities/line-activities";

export function useTaskLineActivities(lineSkuId: number) {
    return useQuery({
        queryKey: lineActivitiesQueryKey(lineSkuId),
        queryFn: () => lineActivitiesProvider.getLineActivities(lineSkuId),
        enabled: lineSkuId > 0,
        retry: false
    });
}
