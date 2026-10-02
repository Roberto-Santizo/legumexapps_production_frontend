import { type WeeklyPlanTaskPerformanceRecord, type WeeklyPlanTaskPerformanceRecordCreateForm, type WeeklyPlanTaskPerformanceRecordForm, type WeeklyPlanTaskPerformanceRecordRepository } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { WeeklyPlanTaskPerformanceRecordDatasourceImpl, WeeklyPlanTaskPerformanceRecordRepositoryImpl } from "@/features/weekly-plan-task-performance-records/infrastructure/infrastructure";
import api from "@/config/http/axios";

export class WeeklyPlanTaskPerformanceRecordProvider {
    constructor(private repository: WeeklyPlanTaskPerformanceRecordRepository) { }

    createWeeklyPlanTaskPerformanceRecord(payload: WeeklyPlanTaskPerformanceRecordCreateForm): Promise<string> {
        return this.repository.createWeeklyPlanTaskPerformanceRecord(payload);
    }

    getWeeklyPlanTaskPerformanceRecords(weeklyPlanTaskId: string): Promise<WeeklyPlanTaskPerformanceRecord[]> {
        return this.repository.getWeeklyPlanTaskPerformanceRecords(weeklyPlanTaskId);
    }

    getWeeklyPlanTaskPerformanceRecordById(id: string): Promise<WeeklyPlanTaskPerformanceRecord> {
        return this.repository.getWeeklyPlanTaskPerformanceRecordById(id);
    }

    updateWeeklyPlanTaskPerformanceRecordById(id: string, payload: WeeklyPlanTaskPerformanceRecordForm): Promise<string> {
        return this.repository.updateWeeklyPlanTaskPerformanceRecordById(id, payload);
    }

    deleteWeeklyPlanTaskPerformanceRecordById(id: string): Promise<string> {
        return this.repository.deleteWeeklyPlanTaskPerformanceRecordById(id);
    }
}

const datasource = new WeeklyPlanTaskPerformanceRecordDatasourceImpl(api);
const repository = new WeeklyPlanTaskPerformanceRecordRepositoryImpl(datasource);
export const weeklyPlanTaskPerformanceRecordProvider = new WeeklyPlanTaskPerformanceRecordProvider(repository);
