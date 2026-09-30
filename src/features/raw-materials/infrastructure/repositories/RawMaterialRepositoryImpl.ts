import type { RawMaterialDatasource, RawMaterialItem, RawMaterialItemForm, RawMaterialRepository, PaginatedRawMaterialItems, RawMaterialFilters } from "@/features/raw-materials/raw-materials";

export class RawMaterialRepositoryImpl implements RawMaterialRepository {
    constructor(private datasource: RawMaterialDatasource) { }

    createRawMaterialItem(payload: RawMaterialItemForm): Promise<string> {
        return this.datasource.createRawMaterialItem(payload);
    }

    getRawMaterialItems(limit: string, page: string, filters?: RawMaterialFilters): Promise<PaginatedRawMaterialItems> {
        return this.datasource.getRawMaterialItems(limit, page, filters);
    }

    getRawMaterialItemByCode(code: string): Promise<RawMaterialItem> {
        return this.datasource.getRawMaterialItemByCode(code)
    }

    updateRawMaterialItemByCode(code: string, payload: RawMaterialItemForm): Promise<string> {
        return this.datasource.updateRawMaterialItemByCode(code, payload)
    }

    deleteRawMaterialItemByCode(code: string): Promise<string> {
        return this.datasource.deleteRawMaterialItemByCode(code)
    }

    uploadFile(file: File): Promise<string> {
        return this.datasource.uploadFile(file);
    }
}
