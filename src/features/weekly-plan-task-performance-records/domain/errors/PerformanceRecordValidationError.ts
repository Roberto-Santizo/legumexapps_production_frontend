import { DomainError } from "@/features/shared/shared";

export class PerformanceRecordValidationError extends DomainError {
    constructor(message: string, public readonly errors: Record<string, string[]>) {
        super(message);
    }
}
