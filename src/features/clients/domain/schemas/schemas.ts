import { ApiPaginatedResponseSchema } from "@/features/shared/shared";
import { z } from "zod";

export const ClientSchema = z.object({
    id: z.number(),
    name: z.string()
});

export const PaginatedClientsSchema = ApiPaginatedResponseSchema.extend({
    data: z.array(ClientSchema)
});
