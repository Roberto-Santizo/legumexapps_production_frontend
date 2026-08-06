import { type WeeklyPlanTaskObservation, type WeeklyPlanTaskObservationForm, type WeeklyPlanTaskObservationRepository, type PaginatedWeeklyPlanTaskObservations } from "@/features/weekly-plan-task-observations/weekly-plan-task-observations";
import { WeeklyPlanTaskObservationDatasourceImpl, WeeklyPlanTaskObservationRepositoryImpl, } from "@/features/weekly-plan-task-observations/infrastructure/infrastructure";
import api from "@/config/http/axios";

export class WeeklyPlanTaskObservationProvider {
    constructor(private repository: WeeklyPlanTaskObservationRepository) { }

    createWeeklyPlanTaskObservation(payload: WeeklyPlanTaskObservationForm): Promise<string> {
        return this.repository.createWeeklyPlanTaskObservation(payload);
    }

    getWeeklyPlanTaskObservations(limit: string, page: string, weeklyPlanTaskId: string): Promise<PaginatedWeeklyPlanTaskObservations> {
        return this.repository.getWeeklyPlanTaskObservations(limit, page, weeklyPlanTaskId);
    }

    getWeeklyPlanTaskObservationById(id: string): Promise<WeeklyPlanTaskObservation> {
        return this.repository.getWeeklyPlanTaskObservationById(id);
    }

    updateWeeklyPlanTaskObservationById(id: string, payload: WeeklyPlanTaskObservationForm): Promise<string> {
        return this.repository.updateWeeklyPlanTaskObservationById(id, payload);
    }

    deleteWeeklyPlanTaskObservationById(id: string): Promise<string> {
        return this.repository.deleteWeeklyPlanTaskObservationById(id);
    }
}

const datasource = new WeeklyPlanTaskObservationDatasourceImpl(api);
const repository = new WeeklyPlanTaskObservationRepositoryImpl(datasource);
export const weeklyPlanTaskObservationProvider = new WeeklyPlanTaskObservationProvider(repository);
