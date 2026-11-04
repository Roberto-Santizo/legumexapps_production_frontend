import { CaptureFieldDataTypeSchema, CaptureFieldSchema, CaptureTypeSchema, PaginatedCaptureFieldsSchema } from "@/features/capture-fields/capture-fields";
import type { z } from "zod";

export type CaptureType = z.infer<typeof CaptureTypeSchema>;
export type CaptureFieldDataType = z.infer<typeof CaptureFieldDataTypeSchema>;
export type CaptureField = z.infer<typeof CaptureFieldSchema>;
export type PaginatedCaptureFields = z.infer<typeof PaginatedCaptureFieldsSchema>;

export type CaptureFieldPayload = {
    key?: string;
    label?: string;
    data_type?: CaptureFieldDataType;
    options?: string[];
}

export type CaptureFieldOptionForm = {
    value: string;
}

export type CaptureFieldForm = {
    key: string;
    label: string;
    data_type: CaptureFieldDataType;
    options: CaptureFieldOptionForm[];
}
