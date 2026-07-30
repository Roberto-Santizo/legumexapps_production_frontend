import type { WeeklyPlanTaskDatasource, WeeklyPlanTask, WeeklyPlanTaskCreateForm, WeeklyPlanTaskUpdateForm, WeeklyPlanTaskRepository, PaginatedWeeklyPlanTasks, AssignOperationDateForm } from "@/features/weekly-plan-tasks/weekly-plan-tasks";

export class WeeklyPlanTaskRepositoryImpl implements WeeklyPlanTaskRepository {
    constructor(private datasource: WeeklyPlanTaskDatasource) { }

    assignOperationDateToTasks(payload: AssignOperationDateForm): Promise<string> {
        return this.datasource.assignOperationDateToTasks(payload);
    }

    createWeeklyPlanTask(payload: WeeklyPlanTaskCreateForm): Promise<string> {
        return this.datasource.createWeeklyPlanTask(payload);
    }

    getWeeklyPlanTasks(weeklyPlanId: string, flagOperationDate: string, operationDate: string, limit: string, page: string): Promise<PaginatedWeeklyPlanTasks> {
        return this.datasource.getWeeklyPlanTasks(weeklyPlanId, flagOperationDate, operationDate, limit, page);
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
