import { z } from "zod";

export const CaptureFieldFiltersSchema = z.object({
    captureType: z.string(),
    isSystem: z.string()
});

export type CaptureFieldFilters = z.infer<typeof CaptureFieldFiltersSchema>;
