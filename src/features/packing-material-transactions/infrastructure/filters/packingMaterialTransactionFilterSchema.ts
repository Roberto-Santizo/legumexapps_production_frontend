import { z } from "zod";

export const PackingMaterialTransactionFiltersSchema = z.object({
    reference: z.string(),
    responsable: z.string(),
    type: z.string()
});

export type PackingMaterialTransactionFilters = z.infer<typeof PackingMaterialTransactionFiltersSchema>;
