import { LineActivitySchema } from "@/features/line-activities/line-activities";
import type { z } from "zod";

export type LineActivity = z.infer<typeof LineActivitySchema>;

export type AssignLineActivityPayload = {
    activity_id: number;
    quantity: number;
}

export type UpdateLineActivityPayload = {
    quantity: number;
}

export type AssignLineActivityForm = {
    activity_id: number;
    quantity: number;
}

export type LineActivityQuantityForm = {
    quantity: number;
}
