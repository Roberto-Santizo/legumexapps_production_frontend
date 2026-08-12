import { z } from "zod";

export const LineDependencySchema = z.object({
    id: z.number(),
    line_dependant_name: z.string(),
    positions: z.number()
});