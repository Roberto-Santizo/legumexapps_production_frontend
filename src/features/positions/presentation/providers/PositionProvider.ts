import { type Position, type PositionForm, type PositionRepository, type PaginatedPositions } from "@/features/positions/positions";
import { PositionDatasourceImpl, PositionRepositoryImpl } from "@/features/positions/infrastructure/infrastructure";
import api from "@/config/http/axios";

export class PositionProvider {
    constructor(private repository: PositionRepository) { }

    createPosition(payload: PositionForm): Promise<string> {
        return this.repository.createPosition(payload);
    }

    getPositions(limit: string, page: string): Promise<PaginatedPositions> {
        return this.repository.getPositions(limit, page);
    }

    getPositionById(id: string): Promise<Position> {
        return this.repository.getPositionById(id);
    }

    updatePositionById(id: string, payload: PositionForm): Promise<string> {
        return this.repository.updatePositionById(id, payload);
    }

    deletePositionById(id: string): Promise<string> {
        return this.repository.deletePositionById(id);
    }
}

const datasource = new PositionDatasourceImpl(api);
const repository = new PositionRepositoryImpl(datasource);
export const positionProvider = new PositionProvider(repository);
