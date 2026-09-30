import { z } from "zod";

export const ClientFiltersSchema = z.object({
    name: z.string()
});

export type ClientFilters = z.infer<typeof ClientFiltersSchema>;
