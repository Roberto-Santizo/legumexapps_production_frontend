import type { CaptureField, CaptureFieldFilters, CaptureFieldPayload, PaginatedCaptureFields } from "@/features/capture-fields/capture-fields";

export abstract class CaptureFieldsRepository {
    abstract createCaptureField(payload: CaptureFieldPayload): Promise<string>;
    abstract getCaptureFields(limit: string, page: string, filters?: Partial<CaptureFieldFilters>): Promise<PaginatedCaptureFields>;
    abstract getCaptureFieldById(id: string): Promise<CaptureField>;
    abstract updateCaptureFieldById(id: string, payload: CaptureFieldPayload): Promise<string>;
    abstract deleteCaptureFieldById(id: string): Promise<string>;
}
