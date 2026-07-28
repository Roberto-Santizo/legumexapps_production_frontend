import { type RawMaterialItem, type RawMaterialItemForm, type RawMaterialRepository, type PaginatedRawMaterialItems } from "@/features/raw-materials/raw-materials";
import { RawMaterialDatasourceImpl, RawMaterialRepositoryImpl, } from "@/features/raw-materials/infrastructure/infrastructure";
import api from "@/config/http/axios";

export class RawMaterialProvider {
    constructor(private repository: RawMaterialRepository) {}

    createRawMaterialItem(payload: RawMaterialItemForm): Promise<string> {
        return this.repository.createRawMaterialItem(payload);
    }

    getRawMaterialItems(limit: string, page: string): Promise<PaginatedRawMaterialItems> {
        return this.repository.getRawMaterialItems(limit, page);
    }

    getRawMaterialItemByCode(code: string): Promise<RawMaterialItem> {
        return this.repository.getRawMaterialItemByCode(code);
    }

    updateRawMaterialItemByCode(code: string, payload: RawMaterialItemForm): Promise<string> {
        return this.repository.updateRawMaterialItemByCode(code, payload);
    }

    deleteRawMaterialItemByCode(code: string): Promise<string> {
        return this.repository.deleteRawMaterialItemByCode(code);
    }
}

const datasource = new RawMaterialDatasourceImpl(api);
const repository = new RawMaterialRepositoryImpl(datasource);
export const rawMaterialProvider = new RawMaterialProvider(repository);
