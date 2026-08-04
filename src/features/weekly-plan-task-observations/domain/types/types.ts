import { WeeklyPlanTaskObservationSchema, PaginatedWeeklyPlanTaskObservationsSchema } from "@/features/weekly-plan-task-observations/weekly-plan-task-observations";
import type { z } from "zod";

export type PaginatedWeeklyPlanTaskObservations = z.infer<typeof PaginatedWeeklyPlanTaskObservationsSchema>;
export type WeeklyPlanTaskObservation = z.infer<typeof WeeklyPlanTaskObservationSchema>;

export type WeeklyPlanTaskObservationForm = {
    weekly_plan_task_id: number;
    observation: string;
}
