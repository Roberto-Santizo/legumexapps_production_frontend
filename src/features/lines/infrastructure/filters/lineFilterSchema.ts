import { z } from "zod";

export const LineFiltersSchema = z.object({
    name: z.string(),
    code: z.string()
});

export type LineFilters = z.infer<typeof LineFiltersSchema>;
