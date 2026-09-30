import { z } from "zod";

export const TimeoutFiltersSchema = z.object({
    name: z.string()
});

export type TimeoutFilters = z.infer<typeof TimeoutFiltersSchema>;
