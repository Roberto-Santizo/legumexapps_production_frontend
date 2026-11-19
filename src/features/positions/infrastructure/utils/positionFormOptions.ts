import type { LineActivity } from "@/features/line-activities/line-activities";
import type { Option } from "@/features/shared/shared";

export const toLineActivityOptions = (activities: LineActivity[]): Option[] =>
    activities.map(activity => ({ value: activity.activity_id, label: `${activity.activity} · ${activity.unit}` }));
