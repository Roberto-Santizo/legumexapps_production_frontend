import type { DraftWeeklyPlan, DraftWeeklyPlanDatasource, DraftWeeklyPlanForm, DraftWeeklyPlanRepository, PaginatedDraftWeeklyPlans } from "@/features/draft-weekly-plans/draft-weekly-plans";
import type { BarChartDatum } from "@/features/shared/shared";

export class DraftWeeklyPlanRepositoryImpl implements DraftWeeklyPlanRepository {
    constructor(private datasource: DraftWeeklyPlanDatasource) { }

    confirmDraftWeeklyPlan(id: string): Promise<string> {
        return this.datasource.confirmDraftWeeklyPlan(id);
    }

    getPackingMaterialNecessityById(id: string): Promise<BarChartDatum[]> {
        return this.datasource.getPackingMaterialNecessityById(id);
    }
    
    getRawNecessityById(id: string): Promise<BarChartDatum[]> {
        return this.datasource.getRawNecessityById(id);
    }

    getHoursPerLineByDraftWeeklyPlanId(id: string): Promise<BarChartDatum[]> {
        return this.datasource.getHoursPerLineByDraftWeeklyPlanId(id);
    }

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
