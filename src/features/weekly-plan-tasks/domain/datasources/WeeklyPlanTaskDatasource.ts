import type { WeeklyPlanTask, WeeklyPlanTaskForm, PaginatedWeeklyPlanTasks } from "@/features/weekly-plan-tasks/weekly-plan-tasks";

export abstract class WeeklyPlanTaskDatasource {
    abstract createWeeklyPlanTask(payload: WeeklyPlanTaskForm): Promise<string>;
    abstract getWeeklyPlanTasks(limit: string, page: string): Promise<PaginatedWeeklyPlanTasks>;
    abstract getWeeklyPlanTaskById(id: string): Promise<WeeklyPlanTask>;
    abstract updateWeeklyPlanTaskById(id: string, payload: WeeklyPlanTaskForm): Promise<string>;
    abstract deleteWeeklyPlanTaskById(id: string): Promise<string>;
}
