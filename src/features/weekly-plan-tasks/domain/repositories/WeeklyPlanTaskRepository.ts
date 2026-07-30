import type { WeeklyPlanTask, WeeklyPlanTaskForm, PaginatedWeeklyPlanTasks, AssignOperationDateForm } from "@/features/weekly-plan-tasks/weekly-plan-tasks";

export abstract class WeeklyPlanTaskRepository {
    abstract createWeeklyPlanTask(payload: WeeklyPlanTaskForm): Promise<string>;
    abstract getWeeklyPlanTasks(weeklyPlanId: string, flagOperationDate:string, limit: string, page: string): Promise<PaginatedWeeklyPlanTasks>;
    abstract getWeeklyPlanTaskById(id: string): Promise<WeeklyPlanTask>;
    abstract updateWeeklyPlanTaskById(id: string, payload: WeeklyPlanTaskForm): Promise<string>;
    abstract deleteWeeklyPlanTaskById(id: string): Promise<string>;

    abstract assignOperationDateToTasks(payload: AssignOperationDateForm): Promise<string>;
}
