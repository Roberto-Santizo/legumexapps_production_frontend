import type { WeeklyPlanTask, WeeklyPlanTaskCreateForm, WeeklyPlanTaskUpdateForm, PaginatedWeeklyPlanTasks, AssignOperationDateForm, SplitWeeklyPlanTaskForm, WeeklyPlanTaskPackingMaterialItem, WeeklyPlanTaskFilters, WeeklyPlanTaskEndForm } from "@/features/weekly-plan-tasks/weekly-plan-tasks";

export abstract class WeeklyPlanTaskRepository {
    abstract createWeeklyPlanTask(payload: WeeklyPlanTaskCreateForm): Promise<string>;
    abstract getWeeklyPlanTasks(limit: string, page: string, filters?: WeeklyPlanTaskFilters): Promise<PaginatedWeeklyPlanTasks>;
    abstract getWeeklyPlanTaskById(id: string): Promise<WeeklyPlanTask>;
    abstract updateWeeklyPlanTaskById(id: string, payload: WeeklyPlanTaskUpdateForm): Promise<string>;
    abstract deleteWeeklyPlanTaskById(id: string): Promise<string>;

    abstract assignOperationDateToTasks(payload: AssignOperationDateForm): Promise<string>;
    abstract splitWeeklyPlanTask(payload: SplitWeeklyPlanTaskForm): Promise<string>;

    abstract getPackingMaterialItemsByTaskId(id: string): Promise<WeeklyPlanTaskPackingMaterialItem[]>;

    abstract startWeeklyPlanTask(id: string): Promise<string>;
    abstract endWeeklyPlanTask(id: string, payload: WeeklyPlanTaskEndForm): Promise<string>;
}
