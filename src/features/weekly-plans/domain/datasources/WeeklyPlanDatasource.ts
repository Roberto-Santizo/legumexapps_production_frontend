import type { WeeklyPlan, WeeklyPlanForm, PaginatedWeeklyPlans, CalendarEventItem, WeeklyPlanSummaryByDate, WeeklyPlanFilters } from "@/features/weekly-plans/weekly-plans";

export abstract class WeeklyPlanDatasource {
    abstract createWeeklyPlan(payload: WeeklyPlanForm): Promise<string>;
    abstract getWeeklyPlans(limit: string, page: string, filters?: WeeklyPlanFilters): Promise<PaginatedWeeklyPlans>;
    abstract getWeeklyPlanById(id: string): Promise<WeeklyPlan>;
    abstract updateWeeklyPlanById(id: string, payload: WeeklyPlanForm): Promise<string>;
    abstract deleteWeeklyPlanById(id: string): Promise<string>;

    abstract getWeeklyPlanTasksForCalendarById(id: string): Promise<CalendarEventItem[]>;
    abstract getWeeklyPlanSummaryByDate(id: string, date: string): Promise<WeeklyPlanSummaryByDate[]>;
}
