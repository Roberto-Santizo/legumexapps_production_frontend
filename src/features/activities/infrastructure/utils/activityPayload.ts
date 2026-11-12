import type { Activity, ActivityForm } from "@/features/activities/activities";

export const toActivityForm = (activity: Activity): ActivityForm => ({
    name: activity.name,
    unit: activity.unit
});
