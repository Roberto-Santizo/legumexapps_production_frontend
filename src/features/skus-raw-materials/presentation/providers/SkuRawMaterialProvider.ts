import { type SkuRawMaterial, type SkuRawMaterialForm, type SkuRawMaterialRepository, type PaginatedSkuRawMaterials } from "@/features/skus-raw-materials/skus-raw-materials";
import { SkuRawMaterialDatasourceImpl, SkuRawMaterialRepositoryImpl } from "@/features/skus-raw-materials/infrastructure/infrastructure";
import api from "@/config/http/axios";

export class SkuRawMaterialProvider {
    constructor(private repository: SkuRawMaterialRepository) { }

    createSkuRawMaterial(payload: SkuRawMaterialForm): Promise<string> {
        return this.repository.createSkuRawMaterial(payload);
    }

    getSkuRawMaterials(skuId: string, limit: string, page: string): Promise<PaginatedSkuRawMaterials> {
        return this.repository.getSkuRawMaterials(skuId, limit, page);
    }

    getSkuRawMaterialById(id: string): Promise<SkuRawMaterial> {
        return this.repository.getSkuRawMaterialById(id);
    }

    updateSkuRawMaterialById(id: string, payload: SkuRawMaterialForm): Promise<string> {
        return this.repository.updateSkuRawMaterialById(id, payload);
    }

    deleteSkuRawMaterialById(id: string): Promise<string> {
        return this.repository.deleteSkuRawMaterialById(id);
    }
}

const datasource = new SkuRawMaterialDatasourceImpl(api);
const repository = new SkuRawMaterialRepositoryImpl(datasource);
export const skuRawMaterialProvider = new SkuRawMaterialProvider(repository);
