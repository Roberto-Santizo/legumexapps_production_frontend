import type { WeeklyPlanTaskDatasource, WeeklyPlanTask, WeeklyPlanTaskCreateForm, WeeklyPlanTaskUpdateForm, WeeklyPlanTaskRepository, PaginatedWeeklyPlanTasks, AssignOperationDateForm, SplitWeeklyPlanTaskForm, WeeklyPlanTaskPackingMaterialItem, WeeklyPlanTaskFilters } from "@/features/weekly-plan-tasks/weekly-plan-tasks";

export class WeeklyPlanTaskRepositoryImpl implements WeeklyPlanTaskRepository {
    constructor(private datasource: WeeklyPlanTaskDatasource) { }

    getPackingMaterialItemsByTaskId(id: string): Promise<WeeklyPlanTaskPackingMaterialItem[]> {
        return this.datasource.getPackingMaterialItemsByTaskId(id);
    }

    assignOperationDateToTasks(payload: AssignOperationDateForm): Promise<string> {
        return this.datasource.assignOperationDateToTasks(payload);
    }

    splitWeeklyPlanTask(payload: SplitWeeklyPlanTaskForm): Promise<string> {
        return this.datasource.splitWeeklyPlanTask(payload);
    }

    createWeeklyPlanTask(payload: WeeklyPlanTaskCreateForm): Promise<string> {
        return this.datasource.createWeeklyPlanTask(payload);
    }

    getWeeklyPlanTasks(limit: string, page: string, filters?: WeeklyPlanTaskFilters): Promise<PaginatedWeeklyPlanTasks> {
        return this.datasource.getWeeklyPlanTasks(limit, page, filters);
    }

    getWeeklyPlanTaskById(id: string): Promise<WeeklyPlanTask> {
        return this.datasource.getWeeklyPlanTaskById(id)
    }

    updateWeeklyPlanTaskById(id: string, payload: WeeklyPlanTaskUpdateForm): Promise<string> {
        return this.datasource.updateWeeklyPlanTaskById(id, payload)
    }

    deleteWeeklyPlanTaskById(id: string): Promise<string> {
        return this.datasource.deleteWeeklyPlanTaskById(id)
    }
}
