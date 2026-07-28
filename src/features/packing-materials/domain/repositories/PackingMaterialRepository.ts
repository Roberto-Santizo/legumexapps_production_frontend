import type { PackingMaterialItem, PackingMaterialItemForm, PaginatedPackingMaterialItems } from "@/features/packing-materials/packing-materials";

export abstract class PackingMaterialRepository {
    abstract createPackingMaterialItem(payload: PackingMaterialItemForm): Promise<string>;
    abstract getPackingMaterialItems(limit: string, page: string): Promise<PaginatedPackingMaterialItems>;
    abstract getPackingMaterialItemByCode(code: string): Promise<PackingMaterialItem>;
    abstract updatePackingMaterialItemByCode(code: string, payload: PackingMaterialItemForm): Promise<string>;
    abstract deletePackingMaterialItemByCode(code: string): Promise<string>;
}