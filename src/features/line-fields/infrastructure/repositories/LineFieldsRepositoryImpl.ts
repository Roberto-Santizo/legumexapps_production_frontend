import type { AssignLineFieldPayload, LineField, LineFieldsDatasource, LineFieldsRepository, UpdateLineFieldPayload } from "@/features/line-fields/line-fields";

export class LineFieldsRepositoryImpl implements LineFieldsRepository {
    constructor(private datasource: LineFieldsDatasource) { }

    getLineFields(lineCode: string): Promise<LineField[]> {
        return this.datasource.getLineFields(lineCode);
    }

    assignLineField(lineCode: string, payload: AssignLineFieldPayload): Promise<string> {
        return this.datasource.assignLineField(lineCode, payload);
    }

    updateLineFieldById(id: string, payload: UpdateLineFieldPayload): Promise<string> {
        return this.datasource.updateLineFieldById(id, payload);
    }

    deleteLineFieldById(id: string): Promise<string> {
        return this.datasource.deleteLineFieldById(id);
    }
}
