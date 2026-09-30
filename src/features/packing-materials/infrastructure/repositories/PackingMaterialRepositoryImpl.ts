import type { PackingMaterialDatasource, PackingMaterialItem, PackingMaterialItemForm, PackingMaterialRepository, PaginatedPackingMaterialItems, PackingMaterialFilters } from "@/features/packing-materials/packing-materials";

export class PackingMaterialRepositoryImpl implements PackingMaterialRepository {
    constructor(private datasource: PackingMaterialDatasource) { }

    createPackingMaterialItem(payload: PackingMaterialItemForm): Promise<string> {
        return this.datasource.createPackingMaterialItem(payload);
    }

    getPackingMaterialItems(limit: string, page: string, filters?: PackingMaterialFilters): Promise<PaginatedPackingMaterialItems> {
        return this.datasource.getPackingMaterialItems(limit, page, filters);
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

    uploadFile(file: File): Promise<string> {
        return this.datasource.uploadFile(file);
    }
}