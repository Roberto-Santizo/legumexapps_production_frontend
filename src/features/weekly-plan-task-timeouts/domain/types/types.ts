import { WeeklyPlanTaskTimeoutSchema } from "@/features/weekly-plan-task-timeouts/weekly-plan-task-timeouts";
import type { z } from "zod";

export type WeeklyPlanTaskTimeout = z.infer<typeof WeeklyPlanTaskTimeoutSchema>;

export type WeeklyPlanTaskTimeoutForm = {
    timeout_id: number;
    observation: string | null;
}

export type WeeklyPlanTaskTimeoutEndForm = {
    observation: string | null;
}
