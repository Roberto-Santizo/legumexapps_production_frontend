import type { Client, ClientDatasource, ClientForm, ClientRepository, PaginatedClients } from "@/features/clients/clients";

export class ClientRepositoryImpl implements ClientRepository {
    constructor(private datasource: ClientDatasource) { }

    createClient(payload: ClientForm): Promise<string> {
        return this.datasource.createClient(payload);
    }

    getClients(limit: string, page: string): Promise<PaginatedClients> {
        return this.datasource.getClients(limit, page);
    }

    getClientById(id: string): Promise<Client> {
        return this.datasource.getClientById(id)
    }

    updateClientById(id: string, payload: ClientForm): Promise<string> {
        return this.datasource.updateClientById(id, payload)
    }

    deleteClientById(id: string): Promise<string> {
        return this.datasource.deleteClientById(id)
    }
}
