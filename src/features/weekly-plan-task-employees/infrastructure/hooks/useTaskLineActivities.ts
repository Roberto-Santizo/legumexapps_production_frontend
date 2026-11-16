import { useQuery } from "@tanstack/react-query";
import { lineActivitiesProvider, lineActivitiesQueryKey } from "@/features/line-activities/line-activities";

export function useTaskLineActivities(lineCode: string) {
    return useQuery({
        queryKey: lineActivitiesQueryKey(lineCode),
        queryFn: () => lineActivitiesProvider.getLineActivities(lineCode),
        enabled: lineCode !== '',
        retry: false
    });
}
