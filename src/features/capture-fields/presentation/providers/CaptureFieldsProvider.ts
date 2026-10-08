import { CaptureFieldsDatasourceImpl, CaptureFieldsRepositoryImpl } from "@/features/capture-fields/infrastructure/infrastructure";
import api from "@/config/http/axios";
import type { CaptureField, CaptureFieldFilters, CaptureFieldPayload, CaptureFieldsRepository, PaginatedCaptureFields } from "@/features/capture-fields/capture-fields";

export class CaptureFieldsProvider {
    constructor(private repository: CaptureFieldsRepository) { }

    createCaptureField(payload: CaptureFieldPayload): Promise<string> {
        return this.repository.createCaptureField(payload);
    }

    getCaptureFields(limit = '', page = '', filters?: Partial<CaptureFieldFilters>): Promise<PaginatedCaptureFields> {
        return this.repository.getCaptureFields(limit, page, filters);
    }

    getCaptureFieldById(id: string): Promise<CaptureField> {
        return this.repository.getCaptureFieldById(id);
    }

    updateCaptureFieldById(id: string, payload: CaptureFieldPayload): Promise<string> {
        return this.repository.updateCaptureFieldById(id, payload);
    }

    deleteCaptureFieldById(id: string): Promise<string> {
        return this.repository.deleteCaptureFieldById(id);
    }
}

const datasource = new CaptureFieldsDatasourceImpl(api);
const repository = new CaptureFieldsRepositoryImpl(datasource);
export const captureFieldsProvider = new CaptureFieldsProvider(repository);
