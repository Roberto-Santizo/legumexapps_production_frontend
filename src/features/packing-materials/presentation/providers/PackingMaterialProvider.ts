import { type PackingMaterialItem, type PackingMaterialItemForm, type PackingMaterialRepository, type PaginatedPackingMaterialItems } from "@/features/packing-materials/packing-materials";
import { PackingMaterialDatasourceImpl, PackingMaterialRepositoryImpl, } from "@/features/packing-materials/infrastructure/infrastructure";
import api from "@/config/http/axios";

export class PackingMaterialProvider {
    constructor(private repository: PackingMaterialRepository) {}

    createPackingMaterialItem(payload: PackingMaterialItemForm): Promise<string> {
        return this.repository.createPackingMaterialItem(payload);
    }

    getPackingMaterialItems(limit: string, page: string): Promise<PaginatedPackingMaterialItems> {
        return this.repository.getPackingMaterialItems(limit, page);
    }

    getPackingMaterialItemByCode(code: string): Promise<PackingMaterialItem> {
        return this.repository.getPackingMaterialItemByCode(code);
    }

    updatePackingMaterialItemByCode(code: string, payload: PackingMaterialItemForm): Promise<string> {
        return this.repository.updatePackingMaterialItemByCode(code, payload);
    }

    deletePackingMaterialItemByCode(code: string): Promise<string> {
        return this.repository.deletePackingMaterialItemByCode(code);
    }
}

const datasource = new PackingMaterialDatasourceImpl(api);
const repository = new PackingMaterialRepositoryImpl(datasource);
export const packingMaterialProvider = new PackingMaterialProvider(repository);