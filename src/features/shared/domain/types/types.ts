import { BarChartDatumSchema, FileResponseSchema } from '@/features/shared/shared';
import z from 'zod';

export type Option = {
    label: string;
    value: number | string;
};

export type FileForm = {
    file: File
}

export type DynamicFormValues = Record<string, number | string>;
export type FileResponse = z.infer<typeof FileResponseSchema>;
export type BarChartDatum = z.infer<typeof BarChartDatumSchema>;

export type ToastVariant = "success" | "error" | "warning" | "info" | "question";

export type ToastAction = {
    label: string;
    onClick: () => void;
};

export type ToastItem = {
    id: string;
    variant: ToastVariant;
    message: string;
    description?: string;
    action?: ToastAction;
    duration: number;
};
