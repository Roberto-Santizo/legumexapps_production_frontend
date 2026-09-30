import { z } from "zod";

export const PositionFiltersSchema = z.object({
    line: z.string(),
    code: z.string(),
    activity: z.string()
});

export type PositionFilters = z.infer<typeof PositionFiltersSchema>;
