import { PositionDatasourceImpl, PositionRepositoryImpl } from "@/features/positions/infrastructure/infrastructure";
import { type Position, type PositionForm, type PositionRepository, type PaginatedPositions, type PositionFilters } from "@/features/positions/positions";
import api from "@/config/http/axios";

export class PositionProvider {
    constructor(private repository: PositionRepository) { }

    createPosition(payload: PositionForm): Promise<string> {
        return this.repository.createPosition(payload);
    }

    getPositions(limit: string, page: string, lineCode = '', filters?: PositionFilters): Promise<PaginatedPositions> {
        return this.repository.getPositions(limit, page, lineCode, filters);
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

    uploadFile(file: File): Promise<string> {
        return this.repository.uploadFile(file);
    }
}

const datasource = new PositionDatasourceImpl(api);
const repository = new PositionRepositoryImpl(datasource);
export const positionProvider = new PositionProvider(repository);
