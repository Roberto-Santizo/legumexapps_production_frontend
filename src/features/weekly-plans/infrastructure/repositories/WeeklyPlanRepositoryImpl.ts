import type { WeeklyPlanDatasource, WeeklyPlan, WeeklyPlanForm, WeeklyPlanRepository, PaginatedWeeklyPlans, CalendarEventItem } from "@/features/weekly-plans/weekly-plans";

export class WeeklyPlanRepositoryImpl implements WeeklyPlanRepository {
    constructor(private datasource: WeeklyPlanDatasource) { }

    getWeeklyPlanTasksForCalendarById(id: string): Promise<CalendarEventItem[]> {
        return this.datasource.getWeeklyPlanTasksForCalendarById(id);
    }

    createWeeklyPlan(payload: WeeklyPlanForm): Promise<string> {
        return this.datasource.createWeeklyPlan(payload);
    }

    getWeeklyPlans(limit: string, page: string): Promise<PaginatedWeeklyPlans> {
        return this.datasource.getWeeklyPlans(limit, page);
    }

    getWeeklyPlanById(id: string): Promise<WeeklyPlan> {
        return this.datasource.getWeeklyPlanById(id)
    }

    updateWeeklyPlanById(id: string, payload: WeeklyPlanForm): Promise<string> {
        return this.datasource.updateWeeklyPlanById(id, payload)
    }

    deleteWeeklyPlanById(id: string): Promise<string> {
        return this.datasource.deleteWeeklyPlanById(id)
    }
}
