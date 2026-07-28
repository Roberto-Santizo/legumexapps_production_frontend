import type { PackingMaterialDatasource, PackingMaterialItem, PackingMaterialItemForm, PackingMaterialRepository, PaginatedPackingMaterialItems } from "@/features/packing-materials/packing-materials";

export class PackingMaterialRepositoryImpl implements PackingMaterialRepository {
    constructor(private datasource: PackingMaterialDatasource) { }

    createPackingMaterialItem(payload: PackingMaterialItemForm): Promise<string> {
        return this.datasource.createPackingMaterialItem(payload);
    }

    getPackingMaterialItems(limit: string, page: string): Promise<PaginatedPackingMaterialItems> {
        return this.datasource.getPackingMaterialItems(limit, page);
    }

    getPackingMaterialItemByCode(code: string): Promise<PackingMaterialItem> {
        return this.datasource.getPackingMaterialItemByCode(code)
    }

    updatePackingMaterialItemByCode(code: string, payload: PackingMaterialItemForm): Promise<string> {
        return this.datasource.updatePackingMaterialItemByCode(code, payload)
    }

    deletePackingMaterialItemByCode(code: string): Promise<string> {
        return this.datasource.deletePackingMaterialItemByCode(code)
    }
}