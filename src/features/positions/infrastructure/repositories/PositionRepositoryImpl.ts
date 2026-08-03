import type { PositionDatasource, Position, PositionForm, PositionRepository, PaginatedPositions } from "@/features/positions/positions";

export class PositionRepositoryImpl implements PositionRepository {
    constructor(private datasource: PositionDatasource) { }

    createPosition(payload: PositionForm): Promise<string> {
        return this.datasource.createPosition(payload);
    }

    getPositions(limit: string, page: string, lineCode: string): Promise<PaginatedPositions> {
        return this.datasource.getPositions(limit, page, lineCode);
    }

    getPositionById(id: string): Promise<Position> {
        return this.datasource.getPositionById(id)
    }

    updatePositionById(id: string, payload: PositionForm): Promise<string> {
        return this.datasource.updatePositionById(id, payload)
    }

    deletePositionById(id: string): Promise<string> {
        return this.datasource.deletePositionById(id)
    }
}
