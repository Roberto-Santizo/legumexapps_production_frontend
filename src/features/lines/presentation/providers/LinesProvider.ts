import { LinesDatasourceImpl, LinesRepositoryImpl } from "@/features/lines/infrastructure/infrastructure";
import api from "@/config/http/axios";
import type { Line, LineForm, LinesRepository, PaginatedLines, LineFilters } from "@/features/lines/lines";

export class LinesProvider {
    constructor(private repository: LinesRepository) { }

    createLine(payload: LineForm): Promise<string> {
        return this.repository.createLine(payload);
    }

    getLines(limit: string, page: string, skuId = '', filters?: LineFilters): Promise<PaginatedLines> {
        return this.repository.getLines(limit, page, skuId, filters);
    }

    getLineByCode(code: string): Promise<Line> {
        return this.repository.getLineByCode(code);
    }

    updateLineByCode(code: string, payload: LineForm): Promise<string> {
        return this.repository.updateLineByCode(code, payload);
    }

    deleteLineByCode(code: string): Promise<string> {
        return this.repository.deleteLineByCode(code);
    }

    uploadFile(file: File): Promise<string> {
        return this.repository.uploadFile(file);
    }
}

const datasource = new LinesDatasourceImpl(api);
const repository = new LinesRepositoryImpl(datasource);
export const linesRepositoryProvider = new LinesProvider(repository);