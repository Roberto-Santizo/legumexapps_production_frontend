import type { QueryClient } from "@tanstack/react-query";

export const activitiesQueryKey = ['getActivities'];

export const activityByIdQueryKey = (id: string) => ['getActivityById', id];

export function invalidateActivityQueries(queryClient: QueryClient, id?: string) {
    queryClient.invalidateQueries({ queryKey: activitiesQueryKey });
    if (id) queryClient.invalidateQueries({ queryKey: activityByIdQueryKey(id) });
}
