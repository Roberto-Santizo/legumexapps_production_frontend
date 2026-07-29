import { type DraftWeeklyPlan, type DraftWeeklyPlanForm, type DraftWeeklyPlanRepository, type PaginatedDraftWeeklyPlans } from "@/features/draft-weekly-plans/draft-weekly-plans";
import { DraftWeeklyPlanDatasourceImpl, DraftWeeklyPlanRepositoryImpl, } from "@/features/draft-weekly-plans/infrastructure/infrastructure";
import api from "@/config/http/axios";

export class DraftWeeklyPlanProvider {
    constructor(private repository: DraftWeeklyPlanRepository) {}

    createDraftWeeklyPlan(payload: DraftWeeklyPlanForm): Promise<string> {
        return this.repository.createDraftWeeklyPlan(payload);
    }

    getDraftWeeklyPlans(limit: string, page: string): Promise<PaginatedDraftWeeklyPlans> {
        return this.repository.getDraftWeeklyPlans(limit, page);
    }

    getDraftWeeklyPlanById(id: string): Promise<DraftWeeklyPlan> {
        return this.repository.getDraftWeeklyPlanById(id);
    }

    updateDraftWeeklyPlanById(id: string, payload: DraftWeeklyPlanForm): Promise<string> {
        return this.repository.updateDraftWeeklyPlanById(id, payload);
    }

    deleteDraftWeeklyPlanById(id: string): Promise<string> {
        return this.repository.deleteDraftWeeklyPlanById(id);
    }
}

const datasource = new DraftWeeklyPlanDatasourceImpl(api);
const repository = new DraftWeeklyPlanRepositoryImpl(datasource);
export const draftWeeklyPlanProvider = new DraftWeeklyPlanProvider(repository);
