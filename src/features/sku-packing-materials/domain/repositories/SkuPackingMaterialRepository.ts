import type { SkuPackingMaterial, SkuPackingMaterialForm, PaginatedSkuPackingMaterials } from "@/features/sku-packing-materials/sku-packing-materials";

export abstract class SkuPackingMaterialRepository {
    abstract createSkuPackingMaterial(payload: SkuPackingMaterialForm): Promise<string>;
    abstract getSkuPackingMaterials(skuCode:string, limit: string, page: string): Promise<PaginatedSkuPackingMaterials>;
    abstract getSkuPackingMaterialById(id: string): Promise<SkuPackingMaterial>;
    abstract updateSkuPackingMaterialById(id: string, payload: SkuPackingMaterialForm): Promise<string>;
    abstract deleteSkuPackingMaterialById(id: string): Promise<string>;
}
