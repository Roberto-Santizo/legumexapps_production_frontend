import type { PerformanceDatasource, Performance, PerformanceForm, PerformanceRepository, PaginatedPerformances } from "@/features/performances/performances";

export class PerformanceRepositoryImpl implements PerformanceRepository {
    constructor(private datasource: PerformanceDatasource) { }

    createPerformance(payload: PerformanceForm): Promise<string> {
        return this.datasource.createPerformance(payload);
    }

    getPerformances(limit: string, page: string): Promise<PaginatedPerformances> {
        return this.datasource.getPerformances(limit, page);
    }

    getPerformanceById(id: string): Promise<Performance> {
        return this.datasource.getPerformanceById(id)
    }

    updatePerformanceById(id: string, payload: PerformanceForm): Promise<string> {
        return this.datasource.updatePerformanceById(id, payload)
    }

    deletePerformanceById(id: string): Promise<string> {
        return this.datasource.deletePerformanceById(id)
    }
}
