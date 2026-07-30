import type { DraftWeeklyPlan, DraftWeeklyPlanForm, PaginatedDraftWeeklyPlans } from "@/features/draft-weekly-plans/draft-weekly-plans";
import type { BarChartDatum } from "@/features/shared/shared";

export abstract class DraftWeeklyPlanRepository {
    abstract createDraftWeeklyPlan(payload: DraftWeeklyPlanForm): Promise<string>;
    abstract getDraftWeeklyPlans(limit: string, page: string): Promise<PaginatedDraftWeeklyPlans>;
    abstract getDraftWeeklyPlanById(id: string): Promise<DraftWeeklyPlan>;
    abstract updateDraftWeeklyPlanById(id: string, payload: DraftWeeklyPlanForm): Promise<string>;
    abstract deleteDraftWeeklyPlanById(id: string): Promise<string>;
    abstract confirmDraftWeeklyPlan(id: string): Promise<string>;

    abstract getHoursPerLineByDraftWeeklyPlanId(id: string): Promise<BarChartDatum[]>;
    abstract getPackingMaterialNecessityById(id: string): Promise<BarChartDatum[]>;
    abstract getRawNecessityById(id: string): Promise<BarChartDatum[]>;
}
