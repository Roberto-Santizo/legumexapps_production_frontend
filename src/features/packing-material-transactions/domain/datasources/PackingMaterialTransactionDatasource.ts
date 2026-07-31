import type { PackingMaterialTransaction, PackingMaterialTransactionCreateForm, PackingMaterialTransactionUpdateForm, PaginatedPackingMaterialTransactions } from "@/features/packing-material-transactions/packing-material-transactions";

export abstract class PackingMaterialTransactionDatasource {
    abstract createPackingMaterialTransaction(payload: PackingMaterialTransactionCreateForm): Promise<string>;
    abstract getPackingMaterialTransactions(limit: string, page: string): Promise<PaginatedPackingMaterialTransactions>;
    abstract getPackingMaterialTransactionById(id: string): Promise<PackingMaterialTransaction>;
    abstract updatePackingMaterialTransactionById(id: string, payload: PackingMaterialTransactionUpdateForm): Promise<string>;
    abstract deletePackingMaterialTransactionById(id: string): Promise<string>;
}
