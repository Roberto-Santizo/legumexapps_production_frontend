import type { Position, PositionForm, PaginatedPositions, PositionFilters } from "@/features/positions/positions";

export abstract class PositionDatasource {
    abstract createPosition(payload: PositionForm): Promise<string>;
    abstract getPositions(limit: string, page: string, lineCode: string, filters?: PositionFilters): Promise<PaginatedPositions>;
    abstract getPositionById(id: string): Promise<Position>;
    abstract updatePositionById(id: string, payload: PositionForm): Promise<string>;
    abstract deletePositionById(id: string): Promise<string>;
    abstract uploadFile(file: File): Promise<string>;
}
