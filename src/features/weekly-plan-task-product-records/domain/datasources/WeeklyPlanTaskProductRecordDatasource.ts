import type { WeeklyPlanTaskProductRecord, WeeklyPlanTaskProductRecordCreateForm, WeeklyPlanTaskProductRecordForm } from "@/features/weekly-plan-task-product-records/weekly-plan-task-product-records";

export abstract class WeeklyPlanTaskProductRecordDatasource {
    abstract createWeeklyPlanTaskProductRecord(payload: WeeklyPlanTaskProductRecordCreateForm): Promise<string>;
    abstract getWeeklyPlanTaskProductRecords(weeklyPlanTaskId: string): Promise<WeeklyPlanTaskProductRecord[]>;
    abstract getWeeklyPlanTaskProductRecordById(id: string): Promise<WeeklyPlanTaskProductRecord>;
    abstract updateWeeklyPlanTaskProductRecordById(id: string, payload: WeeklyPlanTaskProductRecordForm): Promise<string>;
    abstract deleteWeeklyPlanTaskProductRecordById(id: string): Promise<string>;
}
