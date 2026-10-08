import { type WeeklyPlanTaskTimeout, type WeeklyPlanTaskTimeoutEndForm, type WeeklyPlanTaskTimeoutForm, type WeeklyPlanTaskTimeoutRepository } from "@/features/weekly-plan-task-timeouts/weekly-plan-task-timeouts";
import { WeeklyPlanTaskTimeoutDatasourceImpl, WeeklyPlanTaskTimeoutRepositoryImpl } from "@/features/weekly-plan-task-timeouts/infrastructure/infrastructure";
import api from "@/config/http/axios";

export class WeeklyPlanTaskTimeoutProvider {
    constructor(private repository: WeeklyPlanTaskTimeoutRepository) { }

    getWeeklyPlanTaskTimeouts(weeklyPlanTaskId: string): Promise<WeeklyPlanTaskTimeout[]> {
        return this.repository.getWeeklyPlanTaskTimeouts(weeklyPlanTaskId);
    }

    startWeeklyPlanTaskTimeout(weeklyPlanTaskId: string, payload: WeeklyPlanTaskTimeoutForm): Promise<string> {
        return this.repository.startWeeklyPlanTaskTimeout(weeklyPlanTaskId, payload);
    }

    endWeeklyPlanTaskTimeout(id: string, payload: WeeklyPlanTaskTimeoutEndForm): Promise<string> {
        return this.repository.endWeeklyPlanTaskTimeout(id, payload);
    }

    updateWeeklyPlanTaskTimeoutById(id: string, payload: WeeklyPlanTaskTimeoutForm): Promise<string> {
        return this.repository.updateWeeklyPlanTaskTimeoutById(id, payload);
    }

    deleteWeeklyPlanTaskTimeoutById(id: string): Promise<string> {
        return this.repository.deleteWeeklyPlanTaskTimeoutById(id);
    }
}

const datasource = new WeeklyPlanTaskTimeoutDatasourceImpl(api);
const repository = new WeeklyPlanTaskTimeoutRepositoryImpl(datasource);
export const weeklyPlanTaskTimeoutProvider = new WeeklyPlanTaskTimeoutProvider(repository);
