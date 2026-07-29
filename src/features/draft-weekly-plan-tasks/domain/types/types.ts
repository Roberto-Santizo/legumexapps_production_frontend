import { DraftWeeklyPlanTaskSchema, PaginatedDraftWeeklyPlanTasksSchema } from "@/features/draft-weekly-plan-tasks/draft-weekly-plan-tasks";
import type { z } from "zod";

export type PaginatedDraftWeeklyPlanTasks = z.infer<typeof PaginatedDraftWeeklyPlanTasksSchema>;
export type DraftWeeklyPlanTask = z.infer<typeof DraftWeeklyPlanTaskSchema>;

export type DraftWeeklyPlanTaskForm = {
    boxes: number;
    destination: string;
    operation_date: string | null;
    draft_weekly_plan_id: string;
    sku_id: number;
    line_id: number | null;
}
