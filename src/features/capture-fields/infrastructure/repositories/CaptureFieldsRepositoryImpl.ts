import type { CaptureField, CaptureFieldFilters, CaptureFieldPayload, CaptureFieldsDatasource, CaptureFieldsRepository, PaginatedCaptureFields } from "@/features/capture-fields/capture-fields";

export class CaptureFieldsRepositoryImpl implements CaptureFieldsRepository {
    constructor(private datasource: CaptureFieldsDatasource) { }

    createCaptureField(payload: CaptureFieldPayload): Promise<string> {
        return this.datasource.createCaptureField(payload);
    }

    getCaptureFields(limit: string, page: string, filters?: Partial<CaptureFieldFilters>): Promise<PaginatedCaptureFields> {
        return this.datasource.getCaptureFields(limit, page, filters);
    }

    getCaptureFieldById(id: string): Promise<CaptureField> {
        return this.datasource.getCaptureFieldById(id);
    }

    updateCaptureFieldById(id: string, payload: CaptureFieldPayload): Promise<string> {
        return this.datasource.updateCaptureFieldById(id, payload);
    }

    deleteCaptureFieldById(id: string): Promise<string> {
        return this.datasource.deleteCaptureFieldById(id);
    }
}
