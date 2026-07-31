import type { PackingMaterialTransactionItem, PackingMaterialTransactionItemPayload, PaginatedPackingMaterialTransactionItems } from "@/features/packing-material-transaction-items/packing-material-transaction-items";

export abstract class PackingMaterialTransactionItemDatasource {
    abstract createPackingMaterialTransactionItem(payload: PackingMaterialTransactionItemPayload): Promise<string>;
    abstract getPackingMaterialTransactionItems(limit: string, page: string, transactionId: string): Promise<PaginatedPackingMaterialTransactionItems>;
    abstract getPackingMaterialTransactionItemById(id: string): Promise<PackingMaterialTransactionItem>;
    abstract updatePackingMaterialTransactionItemById(id: string, payload: PackingMaterialTransactionItemPayload): Promise<string>;
    abstract deletePackingMaterialTransactionItemById(id: string): Promise<string>;
}
