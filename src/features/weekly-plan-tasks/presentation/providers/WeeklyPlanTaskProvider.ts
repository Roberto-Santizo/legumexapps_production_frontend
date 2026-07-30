import { type WeeklyPlanTask, type WeeklyPlanTaskForm, type WeeklyPlanTaskRepository, type PaginatedWeeklyPlanTasks, type AssignOperationDateForm } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { WeeklyPlanTaskDatasourceImpl, WeeklyPlanTaskRepositoryImpl, } from "@/features/weekly-plan-tasks/infrastructure/infrastructure";
import api from "@/config/http/axios";

export class WeeklyPlanTaskProvider {
    constructor(private repository: WeeklyPlanTaskRepository) { }

    createWeeklyPlanTask(payload: WeeklyPlanTaskForm): Promise<string> {
        return this.repository.createWeeklyPlanTask(payload);
    }

    getWeeklyPlanTasks(weeklyPlanId: string, flagOperationDate: string, limit: string, page: string): Promise<PaginatedWeeklyPlanTasks> {
        return this.repository.getWeeklyPlanTasks(weeklyPlanId, flagOperationDate, limit, page);
    }

    getWeeklyPlanTaskById(id: string): Promise<WeeklyPlanTask> {
        return this.repository.getWeeklyPlanTaskById(id);
    }

    updateWeeklyPlanTaskById(id: string, payload: WeeklyPlanTaskForm): Promise<string> {
        return this.repository.updateWeeklyPlanTaskById(id, payload);
    }

    deleteWeeklyPlanTaskById(id: string): Promise<string> {
        return this.repository.deleteWeeklyPlanTaskById(id);
    }

    assignOperationDateToTasks(payload: AssignOperationDateForm) {
        return this.repository.assignOperationDateToTasks(payload);
    }
}

const datasource = new WeeklyPlanTaskDatasourceImpl(api);
const repository = new WeeklyPlanTaskRepositoryImpl(datasource);
export const weeklyPlanTaskProvider = new WeeklyPlanTaskProvider(repository);
