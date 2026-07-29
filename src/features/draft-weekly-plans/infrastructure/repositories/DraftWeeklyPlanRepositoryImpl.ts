import type { DraftWeeklyPlan, DraftWeeklyPlanDatasource, DraftWeeklyPlanForm, DraftWeeklyPlanRepository, PaginatedDraftWeeklyPlans } from "@/features/draft-weekly-plans/draft-weekly-plans";

export class DraftWeeklyPlanRepositoryImpl implements DraftWeeklyPlanRepository {
    constructor(private datasource: DraftWeeklyPlanDatasource) { }

    createDraftWeeklyPlan(payload: DraftWeeklyPlanForm): Promise<string> {
        return this.datasource.createDraftWeeklyPlan(payload);
    }

    getDraftWeeklyPlans(limit: string, page: string): Promise<PaginatedDraftWeeklyPlans> {
        return this.datasource.getDraftWeeklyPlans(limit, page);
    }

    getDraftWeeklyPlanById(id: string): Promise<DraftWeeklyPlan> {
        return this.datasource.getDraftWeeklyPlanById(id)
    }

    updateDraftWeeklyPlanById(id: string, payload: DraftWeeklyPlanForm): Promise<string> {
        return this.datasource.updateDraftWeeklyPlanById(id, payload)
    }

    deleteDraftWeeklyPlanById(id: string): Promise<string> {
        return this.datasource.deleteDraftWeeklyPlanById(id)
    }
}
