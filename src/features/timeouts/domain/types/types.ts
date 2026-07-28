import { TimeoutSchema, PaginatedTimeoutsSchema } from "@/features/timeouts/timeouts";
import type { z } from "zod";

export type PaginatedTimeouts = z.infer<typeof PaginatedTimeoutsSchema>;
export type Timeout = z.infer<typeof TimeoutSchema>;

export type TimeoutForm = {
    name: string;
}
