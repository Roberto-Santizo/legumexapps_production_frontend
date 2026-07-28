import { ClientSchema, PaginatedClientsSchema } from "@/features/clients/clients";
import type { z } from "zod";

export type PaginatedClients = z.infer<typeof PaginatedClientsSchema>;
export type Client = z.infer<typeof ClientSchema>;

export type ClientForm = {
    name: string;
}
