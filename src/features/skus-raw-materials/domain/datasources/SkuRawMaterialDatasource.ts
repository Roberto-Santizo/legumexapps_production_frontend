import type { SkuRawMaterial, SkuRawMaterialForm, PaginatedSkuRawMaterials } from "@/features/skus-raw-materials/skus-raw-materials";

export abstract class SkuRawMaterialDatasource {
    abstract createSkuRawMaterial(payload: SkuRawMaterialForm): Promise<string>;
    abstract getSkuRawMaterials(skuId: string, limit: string, page: string): Promise<PaginatedSkuRawMaterials>;
    abstract getSkuRawMaterialById(id: string): Promise<SkuRawMaterial>;
    abstract updateSkuRawMaterialById(id: string, payload: SkuRawMaterialForm): Promise<string>;
    abstract deleteSkuRawMaterialById(id: string): Promise<string>;
}
