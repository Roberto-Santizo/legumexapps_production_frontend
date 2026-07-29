import { type Performance, type PerformanceForm, type PerformanceRepository, type PaginatedPerformances, type PerformanceFilters } from "@/features/performances/performances";
import { PerformanceDatasourceImpl, PerformanceRepositoryImpl } from "@/features/performances/infrastructure/infrastructure";
import api from "@/config/http/axios";

export class PerformanceProvider {
    constructor(private repository: PerformanceRepository) { }

    createPerformance(payload: PerformanceForm): Promise<string> {
        return this.repository.createPerformance(payload);
    }

    getPerformances(limit: string, page: string, filters?: PerformanceFilters): Promise<PaginatedPerformances> {
        return this.repository.getPerformances(limit, page, filters);
    }

    getPerformanceById(id: string): Promise<Performance> {
        return this.repository.getPerformanceById(id);
    }

    updatePerformanceById(id: string, payload: PerformanceForm): Promise<string> {
        return this.repository.updatePerformanceById(id, payload);
    }

    deletePerformanceById(id: string): Promise<string> {
        return this.repository.deletePerformanceById(id);
    }
}

const datasource = new PerformanceDatasourceImpl(api);
const repository = new PerformanceRepositoryImpl(datasource);
export const performanceProvider = new PerformanceProvider(repository);
