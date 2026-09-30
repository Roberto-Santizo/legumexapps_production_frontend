import type { DraftWeeklyPlanTask, DraftWeeklyPlanTaskForm, DraftWeeklyPlanTaskFilters, PaginatedDraftWeeklyPlanTasks } from "@/features/draft-weekly-plan-tasks/draft-weekly-plan-tasks";

export abstract class DraftWeeklyPlanTaskRepository {
    abstract createDraftWeeklyPlanTask(payload: DraftWeeklyPlanTaskForm): Promise<string>;
    abstract getDraftWeeklyPlanTasks(draftWeeklyPlanId: string, limit: string, page: string, filters?: DraftWeeklyPlanTaskFilters): Promise<PaginatedDraftWeeklyPlanTasks>;
    abstract getDraftWeeklyPlanTaskById(id: string): Promise<DraftWeeklyPlanTask>;
    abstract updateDraftWeeklyPlanTaskById(id: string, payload: DraftWeeklyPlanTaskForm): Promise<string>;
    abstract deleteDraftWeeklyPlanTaskById(id: string): Promise<string>;
}
