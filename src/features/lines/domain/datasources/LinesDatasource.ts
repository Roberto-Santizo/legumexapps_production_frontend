import type { Line, LineForm, PaginatedLines } from "@/features/lines/lines";

export abstract class LinesDatasource {
    abstract createLine(payload: LineForm): Promise<string>;
    abstract getLines(limit: string, page: string, skuId?: string): Promise<PaginatedLines>;
    abstract getLineByCode(code: string): Promise<Line>;
    abstract updateLineByCode(code: string, payload: LineForm): Promise<string>;
    abstract deleteLineByCode(code: string): Promise<string>;
}