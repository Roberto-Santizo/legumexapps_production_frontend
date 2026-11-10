import { type WeeklyPlanTaskProductRecord, type WeeklyPlanTaskProductRecordCreateForm, type WeeklyPlanTaskProductRecordForm, type WeeklyPlanTaskProductRecordRepository } from "@/features/weekly-plan-task-product-records/weekly-plan-task-product-records";
import { WeeklyPlanTaskProductRecordDatasourceImpl, WeeklyPlanTaskProductRecordRepositoryImpl } from "@/features/weekly-plan-task-product-records/infrastructure/infrastructure";
import api from "@/config/http/axios";

export class WeeklyPlanTaskProductRecordProvider {
    constructor(private repository: WeeklyPlanTaskProductRecordRepository) { }

    createWeeklyPlanTaskProductRecord(payload: WeeklyPlanTaskProductRecordCreateForm): Promise<string> {
        return this.repository.createWeeklyPlanTaskProductRecord(payload);
    }

    getWeeklyPlanTaskProductRecords(weeklyPlanTaskId: string): Promise<WeeklyPlanTaskProductRecord[]> {
        return this.repository.getWeeklyPlanTaskProductRecords(weeklyPlanTaskId);
    }

    getWeeklyPlanTaskProductRecordById(id: string): Promise<WeeklyPlanTaskProductRecord> {
        return this.repository.getWeeklyPlanTaskProductRecordById(id);
    }

    updateWeeklyPlanTaskProductRecordById(id: string, payload: WeeklyPlanTaskProductRecordForm): Promise<string> {
        return this.repository.updateWeeklyPlanTaskProductRecordById(id, payload);
    }

    deleteWeeklyPlanTaskProductRecordById(id: string): Promise<string> {
        return this.repository.deleteWeeklyPlanTaskProductRecordById(id);
    }
}

const datasource = new WeeklyPlanTaskProductRecordDatasourceImpl(api);
const repository = new WeeklyPlanTaskProductRecordRepositoryImpl(datasource);
export const weeklyPlanTaskProductRecordProvider = new WeeklyPlanTaskProductRecordProvider(repository);
