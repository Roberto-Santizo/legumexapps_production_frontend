import { LineSchema, PaginatedLinesSchema } from "@/features/lines/lines";
import type { z } from "zod";

export type Line = z.infer<typeof LineSchema>;
export type PaginatedLines = z.infer<typeof PaginatedLinesSchema>;

export type LineForm = {
    name: string;
    code: string;
}