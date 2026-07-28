import { PositionSchema, PaginatedPositionsSchema } from "@/features/positions/positions";
import type { z } from "zod";

export type PaginatedPositions = z.infer<typeof PaginatedPositionsSchema>;
export type Position = z.infer<typeof PositionSchema>;

export type PositionForm = {
    code: string;
    activity: string;
    line_id: number;
}
