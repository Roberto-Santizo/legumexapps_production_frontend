import { type Timeout, type TimeoutForm, type TimeoutRepository, type PaginatedTimeouts, type TimeoutFilters } from "@/features/timeouts/timeouts";
import { TimeoutDatasourceImpl, TimeoutRepositoryImpl, } from "@/features/timeouts/infrastructure/infrastructure";
import api from "@/config/http/axios";

export class TimeoutProvider {
    constructor(private repository: TimeoutRepository) {}

    createTimeout(payload: TimeoutForm): Promise<string> {
        return this.repository.createTimeout(payload);
    }

    getTimeouts(limit: string, page: string, filters?: TimeoutFilters): Promise<PaginatedTimeouts> {
        return this.repository.getTimeouts(limit, page, filters);
    }

    getTimeoutById(id: string): Promise<Timeout> {
        return this.repository.getTimeoutById(id);
    }

    updateTimeoutById(id: string, payload: TimeoutForm): Promise<string> {
        return this.repository.updateTimeoutById(id, payload);
    }

    deleteTimeoutById(id: string): Promise<string> {
        return this.repository.deleteTimeoutById(id);
    }

    uploadFile(file: File): Promise<string> {
        return this.repository.uploadFile(file);
    }
}

const datasource = new TimeoutDatasourceImpl(api);
const repository = new TimeoutRepositoryImpl(datasource);
export const timeoutProvider = new TimeoutProvider(repository);
