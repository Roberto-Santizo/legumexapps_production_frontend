import type { Activity, ActivityDatasource, ActivityFilters, ActivityForm, ActivityRepository, PaginatedActivities, UpdateActivityPayload } from "@/features/activities/activities";

export class ActivityRepositoryImpl implements ActivityRepository {
    constructor(private datasource: ActivityDatasource) { }

    createActivity(payload: ActivityForm): Promise<string> {
        return this.datasource.createActivity(payload);
    }

    getActivities(limit: string, page: string, filters?: Partial<ActivityFilters>): Promise<PaginatedActivities> {
        return this.datasource.getActivities(limit, page, filters);
    }

    getActivityById(id: string): Promise<Activity> {
        return this.datasource.getActivityById(id);
    }

    updateActivityById(id: string, payload: UpdateActivityPayload): Promise<string> {
        return this.datasource.updateActivityById(id, payload);
    }

    deleteActivityById(id: string): Promise<string> {
        return this.datasource.deleteActivityById(id);
    }
}
