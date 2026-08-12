import type { LineDependancy, LineDependencyForm } from "@/features/line-dependencies/line-dependencies";

export abstract class LineDependenciesDatasource {
    abstract createLineDependency(payload: LineDependencyForm): Promise<string>;
    abstract getLineDependencies(lineId: string): Promise<LineDependancy[]>;
    abstract deleteLineDependencyById(id: string): Promise<string>;
}