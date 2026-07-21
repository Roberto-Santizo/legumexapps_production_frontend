import type { Line, LineForm, LinesRepository, PaginatedLines } from "@/features/lines/lines";

export class LinesProvider {
    constructor(private repository: LinesRepository) {}

    createLine(payload: LineForm): Promise<string> {
        return this.repository.createLine(payload);
    }

    getLines(limit: string, page: string): Promise<PaginatedLines> {
        return this.repository.getLines(limit, page);
    }

    getLineByCode(code: string): Promise<Line> {
        return this.repository.getLineByCode(code);
    }

    updateLineByCode(code: string, payload: LineForm): Promise<string> {
        return this.repository.updateLineByCode(code, payload);
    }

    delete(code: string): Promise<string> {
        return this.repository.delete(code);
    }

}