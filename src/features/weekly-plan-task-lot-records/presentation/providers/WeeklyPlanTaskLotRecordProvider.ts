import { type WeeklyPlanTaskLotRecord, type WeeklyPlanTaskLotRecordCreateForm, type WeeklyPlanTaskLotRecordForm, type WeeklyPlanTaskLotRecordRepository } from "@/features/weekly-plan-task-lot-records/weekly-plan-task-lot-records";
import { WeeklyPlanTaskLotRecordDatasourceImpl, WeeklyPlanTaskLotRecordRepositoryImpl } from "@/features/weekly-plan-task-lot-records/infrastructure/infrastructure";
import api from "@/config/http/axios";

export class WeeklyPlanTaskLotRecordProvider {
    constructor(private repository: WeeklyPlanTaskLotRecordRepository) { }

    createWeeklyPlanTaskLotRecord(payload: WeeklyPlanTaskLotRecordCreateForm): Promise<string> {
        return this.repository.createWeeklyPlanTaskLotRecord(payload);
    }

    getWeeklyPlanTaskLotRecords(weeklyPlanTaskId: string): Promise<WeeklyPlanTaskLotRecord[]> {
        return this.repository.getWeeklyPlanTaskLotRecords(weeklyPlanTaskId);
    }

    getWeeklyPlanTaskLotRecordById(id: string): Promise<WeeklyPlanTaskLotRecord> {
        return this.repository.getWeeklyPlanTaskLotRecordById(id);
    }

    updateWeeklyPlanTaskLotRecordById(id: string, payload: WeeklyPlanTaskLotRecordForm): Promise<string> {
        return this.repository.updateWeeklyPlanTaskLotRecordById(id, payload);
    }

    deleteWeeklyPlanTaskLotRecordById(id: string): Promise<string> {
        return this.repository.deleteWeeklyPlanTaskLotRecordById(id);
    }
}

const datasource = new WeeklyPlanTaskLotRecordDatasourceImpl(api);
const repository = new WeeklyPlanTaskLotRecordRepositoryImpl(datasource);
export const weeklyPlanTaskLotRecordProvider = new WeeklyPlanTaskLotRecordProvider(repository);
