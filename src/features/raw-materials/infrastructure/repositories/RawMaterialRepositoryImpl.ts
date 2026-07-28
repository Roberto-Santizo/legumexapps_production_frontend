import type { RawMaterialDatasource, RawMaterialItem, RawMaterialItemForm, RawMaterialRepository, PaginatedRawMaterialItems } from "@/features/raw-materials/raw-materials";

export class RawMaterialRepositoryImpl implements RawMaterialRepository {
    constructor(private datasource: RawMaterialDatasource) { }

    createRawMaterialItem(payload: RawMaterialItemForm): Promise<string> {
        return this.datasource.createRawMaterialItem(payload);
    }

    getRawMaterialItems(limit: string, page: string): Promise<PaginatedRawMaterialItems> {
        return this.datasource.getRawMaterialItems(limit, page);
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
}
