import type { Position, PositionForm, PaginatedPositions } from "@/features/positions/positions";

export abstract class PositionDatasource {
    abstract createPosition(payload: PositionForm): Promise<string>;
    abstract getPositions(limit: string, page: string, lineCode: string): Promise<PaginatedPositions>;
    abstract getPositionById(id: string): Promise<Position>;
    abstract updatePositionById(id: string, payload: PositionForm): Promise<string>;
    abstract deletePositionById(id: string): Promise<string>;
}
