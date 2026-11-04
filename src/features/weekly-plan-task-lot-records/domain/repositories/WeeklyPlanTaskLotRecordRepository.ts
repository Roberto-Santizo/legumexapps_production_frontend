import type { WeeklyPlanTaskLotRecord, WeeklyPlanTaskLotRecordCreateForm, WeeklyPlanTaskLotRecordForm } from "@/features/weekly-plan-task-lot-records/weekly-plan-task-lot-records";

export abstract class WeeklyPlanTaskLotRecordRepository {
    abstract createWeeklyPlanTaskLotRecord(payload: WeeklyPlanTaskLotRecordCreateForm): Promise<string>;
    abstract getWeeklyPlanTaskLotRecords(weeklyPlanTaskId: string): Promise<WeeklyPlanTaskLotRecord[]>;
    abstract getWeeklyPlanTaskLotRecordById(id: string): Promise<WeeklyPlanTaskLotRecord>;
    abstract updateWeeklyPlanTaskLotRecordById(id: string, payload: WeeklyPlanTaskLotRecordForm): Promise<string>;
    abstract deleteWeeklyPlanTaskLotRecordById(id: string): Promise<string>;
}
