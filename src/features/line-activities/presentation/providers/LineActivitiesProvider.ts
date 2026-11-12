import { LineActivitiesDatasourceImpl, LineActivitiesRepositoryImpl } from "@/features/line-activities/infrastructure/infrastructure";
import api from "@/config/http/axios";
import type { AssignLineActivityPayload, LineActivitiesRepository, LineActivity, UpdateLineActivityPayload } from "@/features/line-activities/line-activities";

export class LineActivitiesProvider {
    constructor(private repository: LineActivitiesRepository) { }

    getLineActivities(lineCode: string): Promise<LineActivity[]> {
        return this.repository.getLineActivities(lineCode);
    }

    assignLineActivity(lineCode: string, payload: AssignLineActivityPayload): Promise<string> {
        return this.repository.assignLineActivity(lineCode, payload);
    }

    updateLineActivityById(id: string, payload: UpdateLineActivityPayload): Promise<string> {
        return this.repository.updateLineActivityById(id, payload);
    }

    deleteLineActivityById(id: string): Promise<string> {
        return this.repository.deleteLineActivityById(id);
    }
}

const datasource = new LineActivitiesDatasourceImpl(api);
const repository = new LineActivitiesRepositoryImpl(datasource);
export const lineActivitiesProvider = new LineActivitiesProvider(repository);
