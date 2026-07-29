import { DraftWeeklyPlanSchema, PaginatedDraftWeeklyPlansSchema } from "@/features/draft-weekly-plans/draft-weekly-plans";
import type { z } from "zod";

export type PaginatedDraftWeeklyPlans = z.infer<typeof PaginatedDraftWeeklyPlansSchema>;
export type DraftWeeklyPlan = z.infer<typeof DraftWeeklyPlanSchema>;

export type DraftWeeklyPlanForm = {
    week: number;
    year: number;
}
