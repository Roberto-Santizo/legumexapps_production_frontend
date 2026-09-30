import { z } from "zod";

export const PackingMaterialFiltersSchema = z.object({
    code: z.string(),
    name: z.string()
});

export type PackingMaterialFilters = z.infer<typeof PackingMaterialFiltersSchema>;
