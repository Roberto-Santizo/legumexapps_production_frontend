import { LineFieldSchema } from "@/features/line-fields/line-fields";
import type { z } from "zod";

export type LineField = z.infer<typeof LineFieldSchema>;

export type AssignLineFieldPayload = {
    capture_field_id: number;
    is_required?: boolean;
    order?: number;
    label?: string | null;
}

export type UpdateLineFieldPayload = {
    is_required?: boolean;
    order?: number;
    label?: string | null;
}

export type LineFieldForm = {
    is_required: boolean;
    label: string;
}

export type LineFieldOrderChange = {
    id: number;
    order: number;
}

export type LineCaptureControlKind = 'number' | 'integer' | 'text' | 'textarea' | 'date' | 'time' | 'boolean' | 'select';

export type LineCaptureFormValues = Record<string, string | boolean>;

export type LineCaptureRecord = Record<string, string | number | boolean | null>;
