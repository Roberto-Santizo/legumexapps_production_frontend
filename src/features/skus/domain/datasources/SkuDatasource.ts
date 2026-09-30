import type { Sku, SkuForm, PaginatedSkus, SkuFilters } from "@/features/skus/skus";

export abstract class SkuDatasource {
    abstract createSku(payload: SkuForm): Promise<string>;
    abstract getSkus(limit: string, page: string, filters?: SkuFilters): Promise<PaginatedSkus>;
    abstract getSkuByCode(code: string): Promise<Sku>;
    abstract updateSkuByCode(code: string, payload: SkuForm): Promise<string>;
    abstract deleteSkuByCode(code: string): Promise<string>;
    abstract uploadFile(file: File): Promise<string>;
}
