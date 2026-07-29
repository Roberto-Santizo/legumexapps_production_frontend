import type { DraftWeeklyPlanTaskDatasource, DraftWeeklyPlanTask, DraftWeeklyPlanTaskForm, DraftWeeklyPlanTaskRepository, PaginatedDraftWeeklyPlanTasks } from "@/features/draft-weekly-plan-tasks/draft-weekly-plan-tasks";

export class DraftWeeklyPlanTaskRepositoryImpl implements DraftWeeklyPlanTaskRepository {
    constructor(private datasource: DraftWeeklyPlanTaskDatasource) { }

    createDraftWeeklyPlanTask(payload: DraftWeeklyPlanTaskForm): Promise<string> {
        return this.datasource.createDraftWeeklyPlanTask(payload);
    }

    getDraftWeeklyPlanTasks(draftWeeklyPlanId: string, limit: string, page: string): Promise<PaginatedDraftWeeklyPlanTasks> {
        return this.datasource.getDraftWeeklyPlanTasks(draftWeeklyPlanId, limit, page);
    }

    getDraftWeeklyPlanTaskById(id: string): Promise<DraftWeeklyPlanTask> {
        return this.datasource.getDraftWeeklyPlanTaskById(id)
    }

    updateDraftWeeklyPlanTaskById(id: string, payload: DraftWeeklyPlanTaskForm): Promise<string> {
        return this.datasource.updateDraftWeeklyPlanTaskById(id, payload)
    }

    deleteDraftWeeklyPlanTaskById(id: string): Promise<string> {
        return this.datasource.deleteDraftWeeklyPlanTaskById(id)
    }
}
