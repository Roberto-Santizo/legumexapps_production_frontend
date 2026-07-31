import { WeeklyPlanTaskSchema, PaginatedWeeklyPlanTasksSchema, WeeklyPlanTaskPackingMaterialItemSchema } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import type { z } from "zod";

export type PaginatedWeeklyPlanTasks = z.infer<typeof PaginatedWeeklyPlanTasksSchema>;
export type WeeklyPlanTask = z.infer<typeof WeeklyPlanTaskSchema>;
export type WeeklyPlanTaskPackingMaterialItem = z.infer<typeof WeeklyPlanTaskPackingMaterialItemSchema>;

export type WeeklyPlanTaskCreateForm = {
    boxes: number;
    destination: string;
    operation_date: string | null;
    weekly_plan_id: number;
    line_sku_id: number;
}

export type WeeklyPlanTaskUpdateForm = {
    boxes: number;
    produced_boxes: number | null;
    pallets: number;
    produced_pallets: number | null;
    hours: number;
    weighed_pounds: number | null;
    destination: string;
    operation_date: string | null;
    start_date: string | null;
    end_date: string | null;
    weekly_plan_id: number;
    line_sku_id: number;
}

export type AssignOperationDateForm = {
    tasksIds: string[];
    operation_date: string;
}

export type SplitWeeklyPlanTaskPortion = {
    boxes: number;
    operation_date: string;
}

export type SplitWeeklyPlanTaskForm = {
    task_id: number;
    portions: SplitWeeklyPlanTaskPortion[];
}
