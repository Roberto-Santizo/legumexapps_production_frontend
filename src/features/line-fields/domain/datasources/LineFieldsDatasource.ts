import type { AssignLineFieldPayload, LineField, UpdateLineFieldPayload } from "@/features/line-fields/line-fields";

export abstract class LineFieldsDatasource {
    abstract getLineFields(lineCode: string): Promise<LineField[]>;
    abstract assignLineField(lineCode: string, payload: AssignLineFieldPayload): Promise<string>;
    abstract updateLineFieldById(id: string, payload: UpdateLineFieldPayload): Promise<string>;
    abstract deleteLineFieldById(id: string): Promise<string>;
}
