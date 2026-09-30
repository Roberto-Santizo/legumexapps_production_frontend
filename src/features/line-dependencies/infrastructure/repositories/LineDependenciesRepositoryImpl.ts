import type { LineDependancy, LineDependenciesDatasource, LineDependenciesRepository, LineDependencyForm } from "@/features/line-dependencies/line-dependencies";

export class LineDependenciesRepositoryImpl implements LineDependenciesRepository {
    constructor(private datasource: LineDependenciesDatasource) { }

    createLineDependency(payload: LineDependencyForm): Promise<string> {
        return this.datasource.createLineDependency(payload);
    }
    getLineDependencies(lineId: string): Promise<LineDependancy[]> {
        return this.datasource.getLineDependencies(lineId);
    }
    deleteLineDependencyById(id: string): Promise<string> {
        return this.datasource.deleteLineDependencyById(id);
    }

}