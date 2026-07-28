import { type Sku, type SkuForm, type SkuRepository, type PaginatedSkus } from "@/features/skus/skus";
import { SkuDatasourceImpl, SkuRepositoryImpl, } from "@/features/skus/infrastructure/infrastructure";
import api from "@/config/http/axios";

export class SkuProvider {
    constructor(private repository: SkuRepository) {}

    createSku(payload: SkuForm): Promise<string> {
        return this.repository.createSku(payload);
    }

    getSkus(limit: string, page: string): Promise<PaginatedSkus> {
        return this.repository.getSkus(limit, page);
    }

    getSkuByCode(code: string): Promise<Sku> {
        return this.repository.getSkuByCode(code);
    }

    updateSkuByCode(code: string, payload: SkuForm): Promise<string> {
        return this.repository.updateSkuByCode(code, payload);
    }

    deleteSkuByCode(code: string): Promise<string> {
        return this.repository.deleteSkuByCode(code);
    }
}

const datasource = new SkuDatasourceImpl(api);
const repository = new SkuRepositoryImpl(datasource);
export const skuProvider = new SkuProvider(repository);
