import { z } from "zod";

export const LineActivitySchema = z.object({
    id: z.number(),
    line_id: z.number(),
    activity_id: z.number(),
    activity: z.string(),
    unit: z.string(),
    quantity: z.number()
});
