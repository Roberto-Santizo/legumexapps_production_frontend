import { type SkuPackingMaterial, type SkuPackingMaterialForm, type SkuPackingMaterialRepository, type PaginatedSkuPackingMaterials } from "@/features/sku-packing-materials/sku-packing-materials";
import { SkuPackingMaterialDatasourceImpl, SkuPackingMaterialRepositoryImpl } from "@/features/sku-packing-materials/infrastructure/infrastructure";
import api from "@/config/http/axios";

export class SkuPackingMaterialProvider {
    constructor(private repository: SkuPackingMaterialRepository) { }

    createSkuPackingMaterial(payload: SkuPackingMaterialForm): Promise<string> {
        return this.repository.createSkuPackingMaterial(payload);
    }

    getSkuPackingMaterials(skuCode:string, limit: string, page: string): Promise<PaginatedSkuPackingMaterials> {
        return this.repository.getSkuPackingMaterials(skuCode, limit, page);
    }

    getSkuPackingMaterialById(id: string): Promise<SkuPackingMaterial> {
        return this.repository.getSkuPackingMaterialById(id);
    }

    updateSkuPackingMaterialById(id: string, payload: SkuPackingMaterialForm): Promise<string> {
        return this.repository.updateSkuPackingMaterialById(id, payload);
    }

    deleteSkuPackingMaterialById(id: string): Promise<string> {
        return this.repository.deleteSkuPackingMaterialById(id);
    }
}

const datasource = new SkuPackingMaterialDatasourceImpl(api);
const repository = new SkuPackingMaterialRepositoryImpl(datasource);
export const skuPackingMaterialProvider = new SkuPackingMaterialProvider(repository);
