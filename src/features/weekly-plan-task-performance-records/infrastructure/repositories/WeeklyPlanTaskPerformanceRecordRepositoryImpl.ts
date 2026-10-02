import type { WeeklyPlanTaskPerformanceRecord, WeeklyPlanTaskPerformanceRecordCreateForm, WeeklyPlanTaskPerformanceRecordDatasource, WeeklyPlanTaskPerformanceRecordForm, WeeklyPlanTaskPerformanceRecordRepository } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

export class WeeklyPlanTaskPerformanceRecordRepositoryImpl implements WeeklyPlanTaskPerformanceRecordRepository {
    constructor(private datasource: WeeklyPlanTaskPerformanceRecordDatasource) { }

    createWeeklyPlanTaskPerformanceRecord(payload: WeeklyPlanTaskPerformanceRecordCreateForm): Promise<string> {
        return this.datasource.createWeeklyPlanTaskPerformanceRecord(payload);
    }

    getWeeklyPlanTaskPerformanceRecords(weeklyPlanTaskId: string): Promise<WeeklyPlanTaskPerformanceRecord[]> {
        return this.datasource.getWeeklyPlanTaskPerformanceRecords(weeklyPlanTaskId);
    }

    getWeeklyPlanTaskPerformanceRecordById(id: string): Promise<WeeklyPlanTaskPerformanceRecord> {
        return this.datasource.getWeeklyPlanTaskPerformanceRecordById(id);
    }

    updateWeeklyPlanTaskPerformanceRecordById(id: string, payload: WeeklyPlanTaskPerformanceRecordForm): Promise<string> {
        return this.datasource.updateWeeklyPlanTaskPerformanceRecordById(id, payload);
    }

    deleteWeeklyPlanTaskPerformanceRecordById(id: string): Promise<string> {
        return this.datasource.deleteWeeklyPlanTaskPerformanceRecordById(id);
    }
}
