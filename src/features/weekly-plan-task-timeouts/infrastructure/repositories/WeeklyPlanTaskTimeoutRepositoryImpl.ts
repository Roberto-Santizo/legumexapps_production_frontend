import type { WeeklyPlanTaskTimeout, WeeklyPlanTaskTimeoutDatasource, WeeklyPlanTaskTimeoutEndForm, WeeklyPlanTaskTimeoutForm, WeeklyPlanTaskTimeoutRepository } from "@/features/weekly-plan-task-timeouts/weekly-plan-task-timeouts";

export class WeeklyPlanTaskTimeoutRepositoryImpl implements WeeklyPlanTaskTimeoutRepository {
    constructor(private datasource: WeeklyPlanTaskTimeoutDatasource) { }

    getWeeklyPlanTaskTimeouts(weeklyPlanTaskId: string): Promise<WeeklyPlanTaskTimeout[]> {
        return this.datasource.getWeeklyPlanTaskTimeouts(weeklyPlanTaskId);
    }

    startWeeklyPlanTaskTimeout(weeklyPlanTaskId: string, payload: WeeklyPlanTaskTimeoutForm): Promise<string> {
        return this.datasource.startWeeklyPlanTaskTimeout(weeklyPlanTaskId, payload);
    }

    endWeeklyPlanTaskTimeout(id: string, payload: WeeklyPlanTaskTimeoutEndForm): Promise<string> {
        return this.datasource.endWeeklyPlanTaskTimeout(id, payload);
    }

    updateWeeklyPlanTaskTimeoutById(id: string, payload: WeeklyPlanTaskTimeoutForm): Promise<string> {
        return this.datasource.updateWeeklyPlanTaskTimeoutById(id, payload);
    }

    deleteWeeklyPlanTaskTimeoutById(id: string): Promise<string> {
        return this.datasource.deleteWeeklyPlanTaskTimeoutById(id);
    }
}
