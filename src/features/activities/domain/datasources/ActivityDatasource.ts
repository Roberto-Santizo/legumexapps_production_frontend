import type { Activity, ActivityFilters, ActivityForm, PaginatedActivities, UpdateActivityPayload } from "@/features/activities/activities";

export abstract class ActivityDatasource {
    abstract createActivity(payload: ActivityForm): Promise<string>;
    abstract getActivities(limit: string, page: string, filters?: Partial<ActivityFilters>): Promise<PaginatedActivities>;
    abstract getActivityById(id: string): Promise<Activity>;
    abstract updateActivityById(id: string, payload: UpdateActivityPayload): Promise<string>;
    abstract deleteActivityById(id: string): Promise<string>;
}
