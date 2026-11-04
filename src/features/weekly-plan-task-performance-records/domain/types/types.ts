import { PalletValueSchema, WeeklyPlanTaskPerformanceRecordSchema } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import type { LineField } from "@/features/line-fields/line-fields";
import type { CaptureType } from "@/features/capture-fields/capture-fields";
import type { z } from "zod";

export type PalletValue = z.infer<typeof PalletValueSchema>;

export type WeeklyPlanTaskPerformanceRecord = z.infer<typeof WeeklyPlanTaskPerformanceRecordSchema>;

export type PerformanceRecordColumn = Pick<LineField, 'key' | 'label' | 'data_type' | 'is_calculated'>;

export type WeeklyPlanTaskPerformanceRecordForm = {
    values: PerformanceRecordValues;
}

export type WeeklyPlanTaskPerformanceRecordCreateForm = WeeklyPlanTaskPerformanceRecordForm & {
    weekly_plan_task_id: number;
}

export type WeeklyPlanTaskPerformanceRecordsSummary = {
    count: number;
    totals: Record<string, number | null>;
    comparableTicketWeight: number;
}

export type PerformanceRecordValues = Record<string, PalletValue>;

export type PerformanceRecordErrorResponse = {
    message: string;
    errors?: Record<string, string[]>;
}

export type PerformanceRecordFormErrors = {
    byField: Record<string, string>;
    general: string[];
}

export type PerformanceRecordEstimateValues = {
    net_weight: number | null;
    ticket_weight: number | null;
    difference: number | null;
}

export type PerformanceRecordCaptureBlocker = {
    title: string;
    message: string;
}

export type RecordCaptureType = Exclude<CaptureType, 'product'>;

export type CapturedRecordMeta = {
    id: number;
    user_name: string;
    created_at: string;
}

export type RecordValueGetter = (key: string) => PalletValue;
