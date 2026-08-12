import { LineDependenciesDatasourceImpl, LineDependenciesRepositoryImpl } from "@/features/line-dependencies/infrastructure/infrastructure";
import { type LineDependancy, type LineDependenciesRepository, type LineDependencyForm } from "@/features/line-dependencies/line-dependencies";
import api from "@/config/http/axios";

class LineDependenciesProvider {
    constructor(private repository: LineDependenciesRepository) { }

    createLineDependency(payload: LineDependencyForm): Promise<string> {
        return this.repository.createLineDependency(payload);
    }
    getLineDependencies(lineId: string): Promise<LineDependancy[]> {
        return this.repository.getLineDependencies(lineId);
    }
    deleteLineDependencyById(id: string): Promise<string> {
        return this.repository.deleteLineDependencyById(id);
    }
}

const datasource = new LineDependenciesDatasourceImpl(api);
const repository = new LineDependenciesRepositoryImpl(datasource);
export const lineDependenciesRepositoryProvider = new LineDependenciesProvider(repository);