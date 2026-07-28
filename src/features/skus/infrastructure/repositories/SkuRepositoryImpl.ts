import type { SkuDatasource, Sku, SkuForm, SkuRepository, PaginatedSkus } from "@/features/skus/skus";

export class SkuRepositoryImpl implements SkuRepository {
    constructor(private datasource: SkuDatasource) { }

    createSku(payload: SkuForm): Promise<string> {
        return this.datasource.createSku(payload);
    }

    getSkus(limit: string, page: string): Promise<PaginatedSkus> {
        return this.datasource.getSkus(limit, page);
    }

    getSkuByCode(code: string): Promise<Sku> {
        return this.datasource.getSkuByCode(code)
    }

    updateSkuByCode(code: string, payload: SkuForm): Promise<string> {
        return this.datasource.updateSkuByCode(code, payload)
    }

    deleteSkuByCode(code: string): Promise<string> {
        return this.datasource.deleteSkuByCode(code)
    }
}
