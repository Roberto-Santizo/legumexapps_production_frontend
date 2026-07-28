import type { TimeoutDatasource, Timeout, TimeoutForm, TimeoutRepository, PaginatedTimeouts } from "@/features/timeouts/timeouts";

export class TimeoutRepositoryImpl implements TimeoutRepository {
    constructor(private datasource: TimeoutDatasource) { }

    createTimeout(payload: TimeoutForm): Promise<string> {
        return this.datasource.createTimeout(payload);
    }

    getTimeouts(limit: string, page: string): Promise<PaginatedTimeouts> {
        return this.datasource.getTimeouts(limit, page);
    }

    getTimeoutById(id: string): Promise<Timeout> {
        return this.datasource.getTimeoutById(id)
    }

    updateTimeoutById(id: string, payload: TimeoutForm): Promise<string> {
        return this.datasource.updateTimeoutById(id, payload)
    }

    deleteTimeoutById(id: string): Promise<string> {
        return this.datasource.deleteTimeoutById(id)
    }
}
