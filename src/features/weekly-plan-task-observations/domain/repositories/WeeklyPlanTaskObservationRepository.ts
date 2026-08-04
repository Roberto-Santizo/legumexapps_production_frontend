import type { WeeklyPlanTaskObservation, WeeklyPlanTaskObservationForm, PaginatedWeeklyPlanTaskObservations } from "@/features/weekly-plan-task-observations/weekly-plan-task-observations";

export abstract class WeeklyPlanTaskObservationRepository {
    abstract createWeeklyPlanTaskObservation(payload: WeeklyPlanTaskObservationForm): Promise<string>;
    abstract getWeeklyPlanTaskObservations(limit: string, page: string): Promise<PaginatedWeeklyPlanTaskObservations>;
    abstract getWeeklyPlanTaskObservationById(id: string): Promise<WeeklyPlanTaskObservation>;
    abstract updateWeeklyPlanTaskObservationById(id: string, payload: WeeklyPlanTaskObservationForm): Promise<string>;
    abstract deleteWeeklyPlanTaskObservationById(id: string): Promise<string>;
}
