import { type WeeklyPlanTask, type WeeklyPlanTaskCreateForm, type WeeklyPlanTaskUpdateForm, type WeeklyPlanTaskRepository, type PaginatedWeeklyPlanTasks, type AssignOperationDateForm, type SplitWeeklyPlanTaskForm, type WeeklyPlanTaskFilters } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { WeeklyPlanTaskDatasourceImpl, WeeklyPlanTaskRepositoryImpl, } from "@/features/weekly-plan-tasks/infrastructure/infrastructure";
import api from "@/config/http/axios";

export class WeeklyPlanTaskProvider {
    constructor(private repository: WeeklyPlanTaskRepository) { }

    createWeeklyPlanTask(payload: WeeklyPlanTaskCreateForm): Promise<string> {
        return this.repository.createWeeklyPlanTask(payload);
    }

    getWeeklyPlanTasks(limit: string, page: string, filters?: WeeklyPlanTaskFilters): Promise<PaginatedWeeklyPlanTasks> {
        return this.repository.getWeeklyPlanTasks(limit, page, filters);
    }

    getWeeklyPlanTaskById(id: string): Promise<WeeklyPlanTask> {
        return this.repository.getWeeklyPlanTaskById(id);
    }

    updateWeeklyPlanTaskById(id: string, payload: WeeklyPlanTaskUpdateForm): Promise<string> {
        return this.repository.updateWeeklyPlanTaskById(id, payload);
    }

    deleteWeeklyPlanTaskById(id: string): Promise<string> {
        return this.repository.deleteWeeklyPlanTaskById(id);
    }

    assignOperationDateToTasks(payload: AssignOperationDateForm) {
        return this.repository.assignOperationDateToTasks(payload);
    }

    splitWeeklyPlanTask(payload: SplitWeeklyPlanTaskForm): Promise<string> {
        return this.repository.splitWeeklyPlanTask(payload);
    }

    getPackingMaterialItemsByTaskId(id: string){
        return this.repository.getPackingMaterialItemsByTaskId(id);
    }
}

const datasource = new WeeklyPlanTaskDatasourceImpl(api);
const repository = new WeeklyPlanTaskRepositoryImpl(datasource);
export const weeklyPlanTaskProvider = new WeeklyPlanTaskProvider(repository);
