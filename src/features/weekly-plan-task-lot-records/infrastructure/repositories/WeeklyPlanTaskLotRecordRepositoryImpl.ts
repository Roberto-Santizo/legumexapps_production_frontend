import type { WeeklyPlanTaskLotRecord, WeeklyPlanTaskLotRecordCreateForm, WeeklyPlanTaskLotRecordDatasource, WeeklyPlanTaskLotRecordForm, WeeklyPlanTaskLotRecordRepository } from "@/features/weekly-plan-task-lot-records/weekly-plan-task-lot-records";

export class WeeklyPlanTaskLotRecordRepositoryImpl implements WeeklyPlanTaskLotRecordRepository {
    constructor(private datasource: WeeklyPlanTaskLotRecordDatasource) { }

    createWeeklyPlanTaskLotRecord(payload: WeeklyPlanTaskLotRecordCreateForm): Promise<string> {
        return this.datasource.createWeeklyPlanTaskLotRecord(payload);
    }

    getWeeklyPlanTaskLotRecords(weeklyPlanTaskId: string): Promise<WeeklyPlanTaskLotRecord[]> {
        return this.datasource.getWeeklyPlanTaskLotRecords(weeklyPlanTaskId);
    }

    getWeeklyPlanTaskLotRecordById(id: string): Promise<WeeklyPlanTaskLotRecord> {
        return this.datasource.getWeeklyPlanTaskLotRecordById(id);
    }

    updateWeeklyPlanTaskLotRecordById(id: string, payload: WeeklyPlanTaskLotRecordForm): Promise<string> {
        return this.datasource.updateWeeklyPlanTaskLotRecordById(id, payload);
    }

    deleteWeeklyPlanTaskLotRecordById(id: string): Promise<string> {
        return this.datasource.deleteWeeklyPlanTaskLotRecordById(id);
    }
}
