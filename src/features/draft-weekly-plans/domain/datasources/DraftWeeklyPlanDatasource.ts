import type { DraftWeeklyPlan, DraftWeeklyPlanForm, PaginatedDraftWeeklyPlans } from "@/features/draft-weekly-plans/draft-weekly-plans";

export abstract class DraftWeeklyPlanDatasource {
    abstract createDraftWeeklyPlan(payload: DraftWeeklyPlanForm): Promise<string>;
    abstract getDraftWeeklyPlans(limit: string, page: string): Promise<PaginatedDraftWeeklyPlans>;
    abstract getDraftWeeklyPlanById(id: string): Promise<DraftWeeklyPlan>;
    abstract updateDraftWeeklyPlanById(id: string, payload: DraftWeeklyPlanForm): Promise<string>;
    abstract deleteDraftWeeklyPlanById(id: string): Promise<string>;
}
