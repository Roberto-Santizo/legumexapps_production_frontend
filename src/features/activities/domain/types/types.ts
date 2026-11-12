import { ActivitySchema, PaginatedActivitiesSchema } from "@/features/activities/activities";
import type { z } from "zod";

export type Activity = z.infer<typeof ActivitySchema>;
export type PaginatedActivities = z.infer<typeof PaginatedActivitiesSchema>;

export type ActivityForm = {
    name: string;
    unit: string;
}

export type UpdateActivityPayload = Partial<ActivityForm>;
