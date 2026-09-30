import { z } from "zod";

export const RawMaterialFiltersSchema = z.object({
    code: z.string(),
    product_name: z.string()
});

export type RawMaterialFilters = z.infer<typeof RawMaterialFiltersSchema>;
