import { type Client, type ClientForm, type ClientRepository, type PaginatedClients } from "@/features/clients/clients";
import { ClientDatasourceImpl, ClientRepositoryImpl, } from "@/features/clients/infrastructure/infrastructure";
import api from "@/config/http/axios";

export class ClientProvider {
    constructor(private repository: ClientRepository) {}

    createClient(payload: ClientForm): Promise<string> {
        return this.repository.createClient(payload);
    }

    getClients(limit: string, page: string): Promise<PaginatedClients> {
        return this.repository.getClients(limit, page);
    }

    getClientById(id: string): Promise<Client> {
        return this.repository.getClientById(id);
    }

    updateClientById(id: string, payload: ClientForm): Promise<string> {
        return this.repository.updateClientById(id, payload);
    }

    deleteClientById(id: string): Promise<string> {
        return this.repository.deleteClientById(id);
    }
}

const datasource = new ClientDatasourceImpl(api);
const repository = new ClientRepositoryImpl(datasource);
export const clientProvider = new ClientProvider(repository);
