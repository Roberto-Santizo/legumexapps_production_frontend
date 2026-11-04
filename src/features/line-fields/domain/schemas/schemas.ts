import { CaptureFieldDataTypeSchema } from "@/features/capture-fields/capture-fields";
import { z } from "zod";

export const LineFieldSchema = z.object({
    id: z.number(),
    line_id: z.number(),
    capture_field_id: z.number(),
    key: z.string(),
    label: z.string(),
    field_label: z.string(),
    custom_label: z.string().nullable(),
    data_type: CaptureFieldDataTypeSchema,
    is_system: z.boolean(),
    is_calculated: z.boolean(),
    depends_on: z.array(z.string()),
    options: z.array(z.string()).nullable(),
    is_required: z.boolean(),
    order: z.number()
});
