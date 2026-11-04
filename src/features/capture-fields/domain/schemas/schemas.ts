import { ApiPaginatedResponseSchema } from "@/features/shared/shared";
import { z } from "zod";

export const CaptureTypeSchema = z.enum(['pallet', 'lot', 'product']);

export const CaptureFieldDataTypeSchema = z.enum(['number', 'integer', 'text', 'date', 'time', 'boolean', 'select']);

export const CaptureFieldSchema = z.object({
    id: z.number(),
    key: z.string(),
    label: z.string(),
    data_type: CaptureFieldDataTypeSchema,
    capture_type: CaptureTypeSchema.nullable(),
    is_system: z.boolean(),
    is_calculated: z.boolean(),
    depends_on: z.array(z.string()),
    options: z.array(z.string()).nullable(),
    is_assigned: z.boolean()
});

export const PaginatedCaptureFieldsSchema = ApiPaginatedResponseSchema.extend({
    data: z.array(CaptureFieldSchema),
    lastPage: z.number().optional()
});
