import type { SkuPackingMaterialDatasource, SkuPackingMaterial, SkuPackingMaterialForm, SkuPackingMaterialRepository, PaginatedSkuPackingMaterials } from "@/features/sku-packing-materials/sku-packing-materials";

export class SkuPackingMaterialRepositoryImpl implements SkuPackingMaterialRepository {
    constructor(private datasource: SkuPackingMaterialDatasource) { }

    createSkuPackingMaterial(payload: SkuPackingMaterialForm): Promise<string> {
        return this.datasource.createSkuPackingMaterial(payload);
    }

    getSkuPackingMaterials(skuCode:string, limit: string, page: string): Promise<PaginatedSkuPackingMaterials> {
        return this.datasource.getSkuPackingMaterials(skuCode, limit, page);
    }

    getSkuPackingMaterialById(id: string): Promise<SkuPackingMaterial> {
        return this.datasource.getSkuPackingMaterialById(id)
    }

    updateSkuPackingMaterialById(id: string, payload: SkuPackingMaterialForm): Promise<string> {
        return this.datasource.updateSkuPackingMaterialById(id, payload)
    }

    deleteSkuPackingMaterialById(id: string): Promise<string> {
        return this.datasource.deleteSkuPackingMaterialById(id)
    }
}
