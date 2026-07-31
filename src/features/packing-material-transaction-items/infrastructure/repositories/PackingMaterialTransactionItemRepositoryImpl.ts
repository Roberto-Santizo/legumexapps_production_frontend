import type { PackingMaterialTransactionItem, PackingMaterialTransactionItemDatasource, PackingMaterialTransactionItemPayload, PackingMaterialTransactionItemRepository, PaginatedPackingMaterialTransactionItems } from "@/features/packing-material-transaction-items/packing-material-transaction-items";

export class PackingMaterialTransactionItemRepositoryImpl implements PackingMaterialTransactionItemRepository {
    constructor(private datasource: PackingMaterialTransactionItemDatasource) { }

    createPackingMaterialTransactionItem(payload: PackingMaterialTransactionItemPayload): Promise<string> {
        return this.datasource.createPackingMaterialTransactionItem(payload);
    }

    getPackingMaterialTransactionItems(limit: string, page: string, transactionId: string): Promise<PaginatedPackingMaterialTransactionItems> {
        return this.datasource.getPackingMaterialTransactionItems(limit, page, transactionId);
    }

    getPackingMaterialTransactionItemById(id: string): Promise<PackingMaterialTransactionItem> {
        return this.datasource.getPackingMaterialTransactionItemById(id);
    }

    updatePackingMaterialTransactionItemById(id: string, payload: PackingMaterialTransactionItemPayload): Promise<string> {
        return this.datasource.updatePackingMaterialTransactionItemById(id, payload);
    }

    deletePackingMaterialTransactionItemById(id: string): Promise<string> {
        return this.datasource.deletePackingMaterialTransactionItemById(id);
    }
}
