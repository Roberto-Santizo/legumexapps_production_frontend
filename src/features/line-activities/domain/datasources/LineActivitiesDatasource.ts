import type { AssignLineActivityPayload, LineActivity, UpdateLineActivityPayload } from "@/features/line-activities/line-activities";

export abstract class LineActivitiesDatasource {
    abstract getLineActivities(lineCode: string): Promise<LineActivity[]>;
    abstract assignLineActivity(lineCode: string, payload: AssignLineActivityPayload): Promise<string>;
    abstract updateLineActivityById(id: string, payload: UpdateLineActivityPayload): Promise<string>;
    abstract deleteLineActivityById(id: string): Promise<string>;
}
