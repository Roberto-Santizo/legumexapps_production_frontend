import { type DraftWeeklyPlanTask, type DraftWeeklyPlanTaskForm, type DraftWeeklyPlanTaskRepository, type PaginatedDraftWeeklyPlanTasks } from "@/features/draft-weekly-plan-tasks/draft-weekly-plan-tasks";
import { DraftWeeklyPlanTaskDatasourceImpl, DraftWeeklyPlanTaskRepositoryImpl, } from "@/features/draft-weekly-plan-tasks/infrastructure/infrastructure";
import api from "@/config/http/axios";

export class DraftWeeklyPlanTaskProvider {
    constructor(private repository: DraftWeeklyPlanTaskRepository) { }

    createDraftWeeklyPlanTask(payload: DraftWeeklyPlanTaskForm): Promise<string> {
        return this.repository.createDraftWeeklyPlanTask(payload);
    }

    getDraftWeeklyPlanTasks(draftWeeklyPlanId: string, limit: string, page: string): Promise<PaginatedDraftWeeklyPlanTasks> {
        return this.repository.getDraftWeeklyPlanTasks(draftWeeklyPlanId, limit, page);
    }

    getDraftWeeklyPlanTaskById(id: string): Promise<DraftWeeklyPlanTask> {
        return this.repository.getDraftWeeklyPlanTaskById(id);
    }

    updateDraftWeeklyPlanTaskById(id: string, payload: DraftWeeklyPlanTaskForm): Promise<string> {
        return this.repository.updateDraftWeeklyPlanTaskById(id, payload);
    }

    deleteDraftWeeklyPlanTaskById(id: string): Promise<string> {
        return this.repository.deleteDraftWeeklyPlanTaskById(id);
    }
}

const datasource = new DraftWeeklyPlanTaskDatasourceImpl(api);
const repository = new DraftWeeklyPlanTaskRepositoryImpl(datasource);
export const draftWeeklyPlanTaskProvider = new DraftWeeklyPlanTaskProvider(repository);
