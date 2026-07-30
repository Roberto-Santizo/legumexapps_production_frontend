import type { WeeklyPlanTaskDatasource, WeeklyPlanTask, WeeklyPlanTaskForm, WeeklyPlanTaskRepository, PaginatedWeeklyPlanTasks, AssignOperationDateForm } from "@/features/weekly-plan-tasks/weekly-plan-tasks";

export class WeeklyPlanTaskRepositoryImpl implements WeeklyPlanTaskRepository {
    constructor(private datasource: WeeklyPlanTaskDatasource) { }
    
    assignOperationDateToTasks(payload: AssignOperationDateForm): Promise<string> {
        return this.datasource.assignOperationDateToTasks(payload);
    }

    createWeeklyPlanTask(payload: WeeklyPlanTaskForm): Promise<string> {
        return this.datasource.createWeeklyPlanTask(payload);
    }

    getWeeklyPlanTasks(weeklyPlanId: string, flagOperationDate: string, limit: string, page: string): Promise<PaginatedWeeklyPlanTasks> {
        return this.datasource.getWeeklyPlanTasks(weeklyPlanId, flagOperationDate, limit, page);
    }

    getWeeklyPlanTaskById(id: string): Promise<WeeklyPlanTask> {
        return this.datasource.getWeeklyPlanTaskById(id)
    }

    updateWeeklyPlanTaskById(id: string, payload: WeeklyPlanTaskForm): Promise<string> {
        return this.datasource.updateWeeklyPlanTaskById(id, payload)
    }

    deleteWeeklyPlanTaskById(id: string): Promise<string> {
        return this.datasource.deleteWeeklyPlanTaskById(id)
    }
}
