import type { Performance, PerformanceForm, PaginatedPerformances } from "@/features/performances/performances";

export abstract class PerformanceDatasource {
    abstract createPerformance(payload: PerformanceForm): Promise<string>;
    abstract getPerformances(limit: string, page: string): Promise<PaginatedPerformances>;
    abstract getPerformanceById(id: string): Promise<Performance>;
    abstract updatePerformanceById(id: string, payload: PerformanceForm): Promise<string>;
    abstract deletePerformanceById(id: string): Promise<string>;
}
