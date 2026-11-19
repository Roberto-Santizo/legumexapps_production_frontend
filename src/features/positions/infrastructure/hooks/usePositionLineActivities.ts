import { lineActivitiesProvider, lineActivitiesQueryKey } from "@/features/line-activities/line-activities";
import { useQuery } from "@tanstack/react-query";

export function usePositionLineActivities(lineCode: string) {
    return useQuery({
        queryKey: lineActivitiesQueryKey(lineCode),
        queryFn: () => lineActivitiesProvider.getLineActivities(lineCode),
        enabled: lineCode !== '',
        retry: false
    });
}
