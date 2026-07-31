import { type PackingMaterialTransactionItem, type PackingMaterialTransactionItemPayload, type PackingMaterialTransactionItemRepository, type PaginatedPackingMaterialTransactionItems } from "@/features/packing-material-transaction-items/packing-material-transaction-items";
import { PackingMaterialTransactionItemDatasourceImpl, PackingMaterialTransactionItemRepositoryImpl } from "@/features/packing-material-transaction-items/infrastructure/infrastructure";
import api from "@/config/http/axios";

export class PackingMaterialTransactionItemProvider {
    constructor(private repository: PackingMaterialTransactionItemRepository) { }

    createPackingMaterialTransactionItem(payload: PackingMaterialTransactionItemPayload): Promise<string> {
        return this.repository.createPackingMaterialTransactionItem(payload);
    }

    getPackingMaterialTransactionItems(limit: string, page: string, transactionId: string): Promise<PaginatedPackingMaterialTransactionItems> {
        return this.repository.getPackingMaterialTransactionItems(limit, page, transactionId);
    }

    getPackingMaterialTransactionItemById(id: string): Promise<PackingMaterialTransactionItem> {
        return this.repository.getPackingMaterialTransactionItemById(id);
    }

    updatePackingMaterialTransactionItemById(id: string, payload: PackingMaterialTransactionItemPayload): Promise<string> {
        return this.repository.updatePackingMaterialTransactionItemById(id, payload);
    }

    deletePackingMaterialTransactionItemById(id: string): Promise<string> {
        return this.repository.deletePackingMaterialTransactionItemById(id);
    }
}

const datasource = new PackingMaterialTransactionItemDatasourceImpl(api);
const repository = new PackingMaterialTransactionItemRepositoryImpl(datasource);
export const packingMaterialTransactionItemProvider = new PackingMaterialTransactionItemProvider(repository);
