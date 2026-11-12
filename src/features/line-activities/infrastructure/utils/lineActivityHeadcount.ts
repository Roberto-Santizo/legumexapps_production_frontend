import type { Activity } from "@/features/activities/activities";
import type { Option } from "@/features/shared/shared";
import type { LineActivity } from "@/features/line-activities/line-activities";

export const availableActivities = (catalog: Activity[], assigned: LineActivity[]): Activity[] => {
    const assignedIds = new Set(assigned.map(item => item.activity_id));
    return catalog.filter(activity => !assignedIds.has(activity.id));
}

export const availableActivityOptions = (catalog: Activity[], assigned: LineActivity[]): Option[] =>
    availableActivities(catalog, assigned).map(activity => ({
        value: activity.id,
        label: `${activity.name} · ${activity.unit}`
    }));

export const totalHeadcount = (assigned: LineActivity[]): number =>
    assigned.reduce((sum, item) => sum + item.quantity, 0);

export const headcountShare = (quantity: number, total: number): number =>
    total > 0 ? (quantity / total) * 100 : 0;

export const peopleLabel = (count: number): string =>
    `${count} ${count === 1 ? 'persona' : 'personas'}`;
