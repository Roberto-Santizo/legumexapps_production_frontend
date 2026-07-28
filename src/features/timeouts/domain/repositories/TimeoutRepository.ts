import type { Timeout, TimeoutForm, PaginatedTimeouts } from "@/features/timeouts/timeouts";

export abstract class TimeoutRepository {
    abstract createTimeout(payload: TimeoutForm): Promise<string>;
    abstract getTimeouts(limit: string, page: string): Promise<PaginatedTimeouts>;
    abstract getTimeoutById(id: string): Promise<Timeout>;
    abstract updateTimeoutById(id: string, payload: TimeoutForm): Promise<string>;
    abstract deleteTimeoutById(id: string): Promise<string>;
}
