import type { WeeklyPlanTaskObservationDatasource, WeeklyPlanTaskObservation, WeeklyPlanTaskObservationForm, WeeklyPlanTaskObservationRepository, PaginatedWeeklyPlanTaskObservations } from "@/features/weekly-plan-task-observations/weekly-plan-task-observations";

export class WeeklyPlanTaskObservationRepositoryImpl implements WeeklyPlanTaskObservationRepository {
    constructor(private datasource: WeeklyPlanTaskObservationDatasource) { }

    createWeeklyPlanTaskObservation(payload: WeeklyPlanTaskObservationForm): Promise<string> {
        return this.datasource.createWeeklyPlanTaskObservation(payload);
    }

    getWeeklyPlanTaskObservations(limit: string, page: string): Promise<PaginatedWeeklyPlanTaskObservations> {
        return this.datasource.getWeeklyPlanTaskObservations(limit, page);
    }

    getWeeklyPlanTaskObservationById(id: string): Promise<WeeklyPlanTaskObservation> {
        return this.datasource.getWeeklyPlanTaskObservationById(id)
    }

    updateWeeklyPlanTaskObservationById(id: string, payload: WeeklyPlanTaskObservationForm): Promise<string> {
        return this.datasource.updateWeeklyPlanTaskObservationById(id, payload)
    }

    deleteWeeklyPlanTaskObservationById(id: string): Promise<string> {
        return this.datasource.deleteWeeklyPlanTaskObservationById(id)
    }
}
