import { ActivityDatasourceImpl, ActivityRepositoryImpl } from "@/features/activities/infrastructure/infrastructure";
import api from "@/config/http/axios";
import type { Activity, ActivityFilters, ActivityForm, ActivityRepository, PaginatedActivities, UpdateActivityPayload } from "@/features/activities/activities";

export class ActivityProvider {
    constructor(private repository: ActivityRepository) { }

    createActivity(payload: ActivityForm): Promise<string> {
        return this.repository.createActivity(payload);
    }

    getActivities(limit: string, page: string, filters?: Partial<ActivityFilters>): Promise<PaginatedActivities> {
        return this.repository.getActivities(limit, page, filters);
    }

    getActivityById(id: string): Promise<Activity> {
        return this.repository.getActivityById(id);
    }

    updateActivityById(id: string, payload: UpdateActivityPayload): Promise<string> {
        return this.repository.updateActivityById(id, payload);
    }

    deleteActivityById(id: string): Promise<string> {
        return this.repository.deleteActivityById(id);
    }
}

const datasource = new ActivityDatasourceImpl(api);
const repository = new ActivityRepositoryImpl(datasource);
export const activityProvider = new ActivityProvider(repository);
