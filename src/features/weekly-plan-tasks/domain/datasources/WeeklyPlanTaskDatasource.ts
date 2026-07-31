import type { WeeklyPlanTask, WeeklyPlanTaskCreateForm, WeeklyPlanTaskUpdateForm, PaginatedWeeklyPlanTasks, AssignOperationDateForm, SplitWeeklyPlanTaskForm, WeeklyPlanTaskPackingMaterialItem } from "@/features/weekly-plan-tasks/weekly-plan-tasks";

export abstract class WeeklyPlanTaskDatasource {
    abstract createWeeklyPlanTask(payload: WeeklyPlanTaskCreateForm): Promise<string>;
    abstract getWeeklyPlanTasks(weeklyPlanId: string, flagOperationDate:string, operationDate: string, limit: string, page: string): Promise<PaginatedWeeklyPlanTasks>;
    abstract getWeeklyPlanTaskById(id: string): Promise<WeeklyPlanTask>;
    abstract updateWeeklyPlanTaskById(id: string, payload: WeeklyPlanTaskUpdateForm): Promise<string>;
    abstract deleteWeeklyPlanTaskById(id: string): Promise<string>;

    abstract assignOperationDateToTasks(payload: AssignOperationDateForm): Promise<string>;
    abstract splitWeeklyPlanTask(payload: SplitWeeklyPlanTaskForm): Promise<string>;

    abstract getPackingMaterialItemsByTaskId(id: string): Promise<WeeklyPlanTaskPackingMaterialItem[]>;
}
