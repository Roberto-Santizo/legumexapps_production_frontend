import { PositionSchema, PaginatedPositionsSchema } from "@/features/positions/positions";
import type { z } from "zod";

export type PaginatedPositions = z.infer<typeof PaginatedPositionsSchema>;
export type Position = z.infer<typeof PositionSchema>;

export type PositionForm = {
    code: string;
    activity_id: number;
    line_sku_id: number;
}
