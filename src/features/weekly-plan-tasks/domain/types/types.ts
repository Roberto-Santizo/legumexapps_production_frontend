import { WeeklyPlanTaskSchema, PaginatedWeeklyPlanTasksSchema } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import type { z } from "zod";

export type PaginatedWeeklyPlanTasks = z.infer<typeof PaginatedWeeklyPlanTasksSchema>;
export type WeeklyPlanTask = z.infer<typeof WeeklyPlanTaskSchema>;

export type WeeklyPlanTaskForm = {
    boxes: number;
    destination: string;
    operation_date: string | null;
    weekly_plan_id: number;
    line_sku_id: number;
}

export type AssignOperationDateForm = {
    tasksIds: string[];
    operation_date: string;
}
