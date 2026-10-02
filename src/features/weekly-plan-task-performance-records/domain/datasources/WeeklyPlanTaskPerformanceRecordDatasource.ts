import type { WeeklyPlanTaskPerformanceRecord, WeeklyPlanTaskPerformanceRecordCreateForm, WeeklyPlanTaskPerformanceRecordForm } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

export abstract class WeeklyPlanTaskPerformanceRecordDatasource {
    abstract createWeeklyPlanTaskPerformanceRecord(payload: WeeklyPlanTaskPerformanceRecordCreateForm): Promise<string>;
    abstract getWeeklyPlanTaskPerformanceRecords(weeklyPlanTaskId: string): Promise<WeeklyPlanTaskPerformanceRecord[]>;
    abstract getWeeklyPlanTaskPerformanceRecordById(id: string): Promise<WeeklyPlanTaskPerformanceRecord>;
    abstract updateWeeklyPlanTaskPerformanceRecordById(id: string, payload: WeeklyPlanTaskPerformanceRecordForm): Promise<string>;
    abstract deleteWeeklyPlanTaskPerformanceRecordById(id: string): Promise<string>;
}
