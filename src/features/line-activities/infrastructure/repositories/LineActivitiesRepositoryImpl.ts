import type { AssignLineActivityPayload, LineActivitiesDatasource, LineActivitiesRepository, LineActivity, UpdateLineActivityPayload } from "@/features/line-activities/line-activities";

export class LineActivitiesRepositoryImpl implements LineActivitiesRepository {
    constructor(private datasource: LineActivitiesDatasource) { }

    getLineActivities(lineSkuId: number): Promise<LineActivity[]> {
        return this.datasource.getLineActivities(lineSkuId);
    }

    assignLineActivity(lineSkuId: number, payload: AssignLineActivityPayload): Promise<string> {
        return this.datasource.assignLineActivity(lineSkuId, payload);
    }

    updateLineActivityById(id: string, payload: UpdateLineActivityPayload): Promise<string> {
        return this.datasource.updateLineActivityById(id, payload);
    }

    deleteLineActivityById(id: string): Promise<string> {
        return this.datasource.deleteLineActivityById(id);
    }
}
