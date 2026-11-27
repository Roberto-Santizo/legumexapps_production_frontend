import { lineActivitiesProvider, lineActivitiesQueryKey } from "@/features/line-activities/line-activities";
import { useQuery } from "@tanstack/react-query";

export function usePositionLineActivities(lineSkuId: number) {
    return useQuery({
        queryKey: lineActivitiesQueryKey(lineSkuId),
        queryFn: () => lineActivitiesProvider.getLineActivities(lineSkuId),
        enabled: lineSkuId > 0,
        retry: false
    });
}
