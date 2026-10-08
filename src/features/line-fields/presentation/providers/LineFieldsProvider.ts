import { LineFieldsDatasourceImpl, LineFieldsRepositoryImpl } from "@/features/line-fields/infrastructure/infrastructure";
import api from "@/config/http/axios";
import type { AssignLineFieldPayload, LineField, LineFieldsRepository, UpdateLineFieldPayload } from "@/features/line-fields/line-fields";

export class LineFieldsProvider {
    constructor(private repository: LineFieldsRepository) { }

    getLineFields(lineCode: string): Promise<LineField[]> {
        return this.repository.getLineFields(lineCode);
    }

    assignLineField(lineCode: string, payload: AssignLineFieldPayload): Promise<string> {
        return this.repository.assignLineField(lineCode, payload);
    }

    updateLineFieldById(id: string, payload: UpdateLineFieldPayload): Promise<string> {
        return this.repository.updateLineFieldById(id, payload);
    }

    deleteLineFieldById(id: string): Promise<string> {
        return this.repository.deleteLineFieldById(id);
    }
}

const datasource = new LineFieldsDatasourceImpl(api);
const repository = new LineFieldsRepositoryImpl(datasource);
export const lineFieldsProvider = new LineFieldsProvider(repository);
