import type { Sku, SkuForm, PaginatedSkus } from "@/features/skus/skus";

export abstract class SkuRepository {
    abstract createSku(payload: SkuForm): Promise<string>;
    abstract getSkus(limit: string, page: string): Promise<PaginatedSkus>;
    abstract getSkuByCode(code: string): Promise<Sku>;
    abstract updateSkuByCode(code: string, payload: SkuForm): Promise<string>;
    abstract deleteSkuByCode(code: string): Promise<string>;
}
