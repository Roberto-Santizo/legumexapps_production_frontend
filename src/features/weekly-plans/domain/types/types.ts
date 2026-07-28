import { WeeklyPlanSchema, PaginatedWeeklyPlansSchema } from "@/features/weekly-plans/weekly-plans";
import type { z } from "zod";

export type PaginatedWeeklyPlans = z.infer<typeof PaginatedWeeklyPlansSchema>;
export type WeeklyPlan = z.infer<typeof WeeklyPlanSchema>;

export type WeeklyPlanForm = {
    week: number;
    year: number;
}
