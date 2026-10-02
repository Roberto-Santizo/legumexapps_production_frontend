import type { WeeklyPlanTaskTimeout, WeeklyPlanTaskTimeoutEndForm, WeeklyPlanTaskTimeoutForm } from "@/features/weekly-plan-task-timeouts/weekly-plan-task-timeouts";

export abstract class WeeklyPlanTaskTimeoutRepository {
    abstract getWeeklyPlanTaskTimeouts(weeklyPlanTaskId: string): Promise<WeeklyPlanTaskTimeout[]>;
    abstract startWeeklyPlanTaskTimeout(weeklyPlanTaskId: string, payload: WeeklyPlanTaskTimeoutForm): Promise<string>;
    abstract endWeeklyPlanTaskTimeout(id: string, payload: WeeklyPlanTaskTimeoutEndForm): Promise<string>;
    abstract updateWeeklyPlanTaskTimeoutById(id: string, payload: WeeklyPlanTaskTimeoutForm): Promise<string>;
    abstract deleteWeeklyPlanTaskTimeoutById(id: string): Promise<string>;
}
