import type { WeeklyPlanTaskProductRecord, WeeklyPlanTaskProductRecordCreateForm, WeeklyPlanTaskProductRecordDatasource, WeeklyPlanTaskProductRecordForm, WeeklyPlanTaskProductRecordRepository } from "@/features/weekly-plan-task-product-records/weekly-plan-task-product-records";

export class WeeklyPlanTaskProductRecordRepositoryImpl implements WeeklyPlanTaskProductRecordRepository {
    constructor(private datasource: WeeklyPlanTaskProductRecordDatasource) { }

    createWeeklyPlanTaskProductRecord(payload: WeeklyPlanTaskProductRecordCreateForm): Promise<string> {
        return this.datasource.createWeeklyPlanTaskProductRecord(payload);
    }

    getWeeklyPlanTaskProductRecords(weeklyPlanTaskId: string): Promise<WeeklyPlanTaskProductRecord[]> {
        return this.datasource.getWeeklyPlanTaskProductRecords(weeklyPlanTaskId);
    }

    getWeeklyPlanTaskProductRecordById(id: string): Promise<WeeklyPlanTaskProductRecord> {
        return this.datasource.getWeeklyPlanTaskProductRecordById(id);
    }

    updateWeeklyPlanTaskProductRecordById(id: string, payload: WeeklyPlanTaskProductRecordForm): Promise<string> {
        return this.datasource.updateWeeklyPlanTaskProductRecordById(id, payload);
    }

    deleteWeeklyPlanTaskProductRecordById(id: string): Promise<string> {
        return this.datasource.deleteWeeklyPlanTaskProductRecordById(id);
    }
}
