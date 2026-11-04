import { LineSchema, PaginatedLinesSchema } from "@/features/lines/lines";
import type { CaptureType } from "@/features/capture-fields/capture-fields";
import type { z } from "zod";

export type Line = z.infer<typeof LineSchema>;
export type PaginatedLines = z.infer<typeof PaginatedLinesSchema>;

export type LineForm = {
    name: string;
    code: string;
    shift: number;
    capture_type: CaptureType;
}