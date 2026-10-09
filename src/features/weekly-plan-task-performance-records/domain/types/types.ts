import { PalletValueSchema, WeeklyPlanTaskPerformanceRecordSchema } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import type { LineField } from "@/features/line-fields/line-fields";
import type { z } from "zod";

export type PalletValue = z.infer<typeof PalletValueSchema>;

export type WeeklyPlanTaskPerformanceRecord = z.infer<typeof WeeklyPlanTaskPerformanceRecordSchema>;

export type PerformanceRecordColumn = Pick<LineField, 'key' | 'label' | 'data_type' | 'is_calculated'>;

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
    totals: Record<string, number | null>;
    comparableTicketWeight: number;
}
