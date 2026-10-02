import { WeeklyPlanTaskPerformanceRecordSchema } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import type { z } from "zod";

export type WeeklyPlanTaskPerformanceRecord = z.infer<typeof WeeklyPlanTaskPerformanceRecordSchema>;

export type WeeklyPlanTaskPerformanceRecordForm = {
    pallet_number: number | null;
    boxes: number | null;
    weighed_pounds: number;
}

export type WeeklyPlanTaskPerformanceRecordCreateForm = WeeklyPlanTaskPerformanceRecordForm & {
    weekly_plan_task_id: number;
}

export type WeeklyPlanTaskPerformanceRecordsSummary = {
    count: number;
    weighedPounds: number;
    theoreticalPounds: number;
    differencePounds: number;
    hasTheoretical: boolean;
}
