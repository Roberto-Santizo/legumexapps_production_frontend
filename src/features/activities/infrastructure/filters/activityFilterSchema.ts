import { z } from "zod";

export const ActivityFiltersSchema = z.object({
    name: z.string()
});

export type ActivityFilters = z.infer<typeof ActivityFiltersSchema>;
