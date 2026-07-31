import { type PackingMaterialTransaction, type PackingMaterialTransactionCreateForm, type PackingMaterialTransactionRepository, type PackingMaterialTransactionUpdateForm, type PaginatedPackingMaterialTransactions } from "@/features/packing-material-transactions/packing-material-transactions";
import { PackingMaterialTransactionDatasourceImpl, PackingMaterialTransactionRepositoryImpl } from "@/features/packing-material-transactions/infrastructure/infrastructure";
import api from "@/config/http/axios";

export class PackingMaterialTransactionProvider {
    constructor(private repository: PackingMaterialTransactionRepository) { }

    createPackingMaterialTransaction(payload: PackingMaterialTransactionCreateForm): Promise<string> {
        return this.repository.createPackingMaterialTransaction(payload);
    }

    getPackingMaterialTransactions(limit: string, page: string): Promise<PaginatedPackingMaterialTransactions> {
        return this.repository.getPackingMaterialTransactions(limit, page);
    }

    getPackingMaterialTransactionById(id: string): Promise<PackingMaterialTransaction> {
        return this.repository.getPackingMaterialTransactionById(id);
    }

    updatePackingMaterialTransactionById(id: string, payload: PackingMaterialTransactionUpdateForm): Promise<string> {
        return this.repository.updatePackingMaterialTransactionById(id, payload);
    }

    deletePackingMaterialTransactionById(id: string): Promise<string> {
        return this.repository.deletePackingMaterialTransactionById(id);
    }
}

const datasource = new PackingMaterialTransactionDatasourceImpl(api);
const repository = new PackingMaterialTransactionRepositoryImpl(datasource);
export const packingMaterialTransactionProvider = new PackingMaterialTransactionProvider(repository);
