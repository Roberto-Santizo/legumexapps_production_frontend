import type { PackingMaterialTransaction, PackingMaterialTransactionCreateForm, PackingMaterialTransactionDatasource, PackingMaterialTransactionRepository, PackingMaterialTransactionUpdateForm, PaginatedPackingMaterialTransactions } from "@/features/packing-material-transactions/packing-material-transactions";

export class PackingMaterialTransactionRepositoryImpl implements PackingMaterialTransactionRepository {
    constructor(private datasource: PackingMaterialTransactionDatasource) { }

    createPackingMaterialTransaction(payload: PackingMaterialTransactionCreateForm): Promise<string> {
        return this.datasource.createPackingMaterialTransaction(payload);
    }

    getPackingMaterialTransactions(limit: string, page: string): Promise<PaginatedPackingMaterialTransactions> {
        return this.datasource.getPackingMaterialTransactions(limit, page);
    }

    getPackingMaterialTransactionById(id: string): Promise<PackingMaterialTransaction> {
        return this.datasource.getPackingMaterialTransactionById(id);
    }

    updatePackingMaterialTransactionById(id: string, payload: PackingMaterialTransactionUpdateForm): Promise<string> {
        return this.datasource.updatePackingMaterialTransactionById(id, payload);
    }

    deletePackingMaterialTransactionById(id: string): Promise<string> {
        return this.datasource.deletePackingMaterialTransactionById(id);
    }
}
