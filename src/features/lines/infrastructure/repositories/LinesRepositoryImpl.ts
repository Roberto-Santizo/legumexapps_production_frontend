import type { Line, LineForm, LinesDatasource, LinesRepository, PaginatedLines } from "@/features/lines/lines";

export class LinesRepositoryImpl implements LinesRepository {
    constructor(private datasource: LinesDatasource) { }

    createLine(payload: LineForm): Promise<string> {
        return this.datasource.createLine(payload);
    }

    getLines(limit: string, page: string, skuId?: string): Promise<PaginatedLines> {
        return this.datasource.getLines(limit, page, skuId);
    }

    getLineByCode(code: string): Promise<Line> {
        return this.datasource.getLineByCode(code);
    }

    updateLineByCode(code: string, payload: LineForm): Promise<string> {
        return this.datasource.updateLineByCode(code, payload);
    }

    deleteLineByCode(code: string): Promise<string> {
        return this.datasource.deleteLineByCode(code);
    }

}