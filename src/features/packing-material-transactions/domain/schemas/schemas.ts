import { ApiPaginatedResponseSchema } from "@/features/shared/shared";
import { z } from "zod";

export const PackingMaterialTransactionSchema = z.object({
    id: z.number(),
    reference: z.string(),
    responsable: z.string(),
    observations: z.string(),
    responsable_signature: z.string(),
    user_signature: z.string(),
    type: z.number(),
    user_id: z.number(),
    user_name: z.string(),
    weekly_plan_task_id: z.number()
});

export const PaginatedPackingMaterialTransactionsSchema = ApiPaginatedResponseSchema.extend({
    data: z.array(PackingMaterialTransactionSchema)
});
