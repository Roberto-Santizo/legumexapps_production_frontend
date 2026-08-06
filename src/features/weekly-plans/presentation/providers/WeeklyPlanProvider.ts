import { type WeeklyPlan, type WeeklyPlanForm, type WeeklyPlanRepository, type PaginatedWeeklyPlans } from "@/features/weekly-plans/weekly-plans";
import { WeeklyPlanDatasourceImpl, WeeklyPlanRepositoryImpl, } from "@/features/weekly-plans/infrastructure/infrastructure";
import api from "@/config/http/axios";

export class WeeklyPlanProvider {
    constructor(private repository: WeeklyPlanRepository) { }

    createWeeklyPlan(payload: WeeklyPlanForm): Promise<string> {
        return this.repository.createWeeklyPlan(payload);
    }

    getWeeklyPlans(limit: string, page: string): Promise<PaginatedWeeklyPlans> {
        return this.repository.getWeeklyPlans(limit, page);
    }

    getWeeklyPlanById(id: string): Promise<WeeklyPlan> {
        return this.repository.getWeeklyPlanById(id);
    }

    updateWeeklyPlanById(id: string, payload: WeeklyPlanForm): Promise<string> {
        return this.repository.updateWeeklyPlanById(id, payload);
    }

    deleteWeeklyPlanById(id: string): Promise<string> {
        return this.repository.deleteWeeklyPlanById(id);
    }

    getWeeklyPlanTasksForCalendarById(id: string) {
        return this.repository.getWeeklyPlanTasksForCalendarById(id);
    }

    getWeeklyPlanSummaryByDate(id: string, date: string) {
        return this.repository.getWeeklyPlanSummaryByDate(id, date);
    }
}

const datasource = new WeeklyPlanDatasourceImpl(api);
const repository = new WeeklyPlanRepositoryImpl(datasource);
export const weeklyPlanProvider = new WeeklyPlanProvider(repository);
