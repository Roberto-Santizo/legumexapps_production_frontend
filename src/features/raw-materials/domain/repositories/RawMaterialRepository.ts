import type { RawMaterialItem, RawMaterialItemForm, PaginatedRawMaterialItems } from "@/features/raw-materials/raw-materials";

export abstract class RawMaterialRepository {
    abstract createRawMaterialItem(payload: RawMaterialItemForm): Promise<string>;
    abstract getRawMaterialItems(limit: string, page: string): Promise<PaginatedRawMaterialItems>;
    abstract getRawMaterialItemByCode(code: string): Promise<RawMaterialItem>;
    abstract updateRawMaterialItemByCode(code: string, payload: RawMaterialItemForm): Promise<string>;
    abstract deleteRawMaterialItemByCode(code: string): Promise<string>;
}
