import { z } from "zod";

export const SkuFiltersSchema = z.object({
    code: z.string(),
    product_name: z.string(),
    client: z.string()
});

export type SkuFilters = z.infer<typeof SkuFiltersSchema>;
