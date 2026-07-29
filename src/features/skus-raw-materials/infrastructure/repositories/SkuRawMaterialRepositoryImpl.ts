import type { SkuRawMaterialDatasource, SkuRawMaterial, SkuRawMaterialForm, SkuRawMaterialRepository, PaginatedSkuRawMaterials } from "@/features/skus-raw-materials/skus-raw-materials";

export class SkuRawMaterialRepositoryImpl implements SkuRawMaterialRepository {
    constructor(private datasource: SkuRawMaterialDatasource) { }

    createSkuRawMaterial(payload: SkuRawMaterialForm): Promise<string> {
        return this.datasource.createSkuRawMaterial(payload);
    }

    getSkuRawMaterials(skuId: string, limit: string, page: string): Promise<PaginatedSkuRawMaterials> {
        return this.datasource.getSkuRawMaterials(skuId, limit, page);
    }

    getSkuRawMaterialById(id: string): Promise<SkuRawMaterial> {
        return this.datasource.getSkuRawMaterialById(id)
    }

    updateSkuRawMaterialById(id: string, payload: SkuRawMaterialForm): Promise<string> {
        return this.datasource.updateSkuRawMaterialById(id, payload)
    }

    deleteSkuRawMaterialById(id: string): Promise<string> {
        return this.datasource.deleteSkuRawMaterialById(id)
    }
}
