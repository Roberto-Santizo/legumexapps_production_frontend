import type { Timeout, TimeoutForm, PaginatedTimeouts, TimeoutFilters } from "@/features/timeouts/timeouts";

export abstract class TimeoutRepository {
    abstract createTimeout(payload: TimeoutForm): Promise<string>;
    abstract getTimeouts(limit: string, page: string, filters?: TimeoutFilters): Promise<PaginatedTimeouts>;
    abstract getTimeoutById(id: string): Promise<Timeout>;
    abstract updateTimeoutById(id: string, payload: TimeoutForm): Promise<string>;
    abstract deleteTimeoutById(id: string): Promise<string>;
    abstract uploadFile(file: File): Promise<string>;
}
