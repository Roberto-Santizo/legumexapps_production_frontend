import type { WeeklyPlan, WeeklyPlanForm, PaginatedWeeklyPlans, CalendarEventItem } from "@/features/weekly-plans/weekly-plans";

export abstract class WeeklyPlanRepository {
    abstract createWeeklyPlan(payload: WeeklyPlanForm): Promise<string>;
    abstract getWeeklyPlans(limit: string, page: string): Promise<PaginatedWeeklyPlans>;
    abstract getWeeklyPlanById(id: string): Promise<WeeklyPlan>;
    abstract updateWeeklyPlanById(id: string, payload: WeeklyPlanForm): Promise<string>;
    abstract deleteWeeklyPlanById(id: string): Promise<string>;

    abstract getWeeklyPlanTasksForCalendarById(id: string): Promise<CalendarEventItem[]>;
}
