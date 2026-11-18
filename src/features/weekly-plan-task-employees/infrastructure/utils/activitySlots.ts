import type { LineActivity } from "@/features/line-activities/line-activities";
import type { ActivitySlot } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type ActivityId = number | null | undefined;

export const countByActivity = (activityIds: ActivityId[]): Map<number, number> =>
    activityIds.reduce<Map<number, number>>(
        (counts, id) => (id == null ? counts : counts.set(id, (counts.get(id) ?? 0) + 1)),
        new Map()
    );

export const buildActivitySlots = (activities: LineActivity[], activityIds: ActivityId[]): ActivitySlot[] => {
    const counts = countByActivity(activityIds);

    return activities.map((item) => {
        const used = counts.get(item.id) ?? 0;

        return {
            id: item.id,
            activity: item.activity,
            unit: item.unit,
            quantity: item.quantity,
            used,
            remaining: item.quantity - used,
        };
    });
};

export const getOverbookedSlots = (slots: ActivitySlot[]): ActivitySlot[] =>
    slots.filter((slot) => slot.remaining < 0);

export const getSlotsCapacity = (slots: ActivitySlot[]): number =>
    slots.reduce((sum, slot) => sum + slot.quantity, 0);

export const getSlotsUsed = (slots: ActivitySlot[]): number =>
    slots.reduce((sum, slot) => sum + slot.used, 0);

export const formatRemainingPlaces = (remaining: number): string => {
    if (remaining < 0) return `${Math.abs(remaining)} de más`;
    if (remaining === 0) return 'Sin lugares';

    return `${remaining} ${remaining === 1 ? 'lugar libre' : 'lugares libres'}`;
};

export const formatOverbookedSlot = (slot: ActivitySlot): string =>
    `La actividad ${slot.activity} admite ${slot.quantity} ${slot.quantity === 1 ? 'persona' : 'personas'} y tiene ${slot.used}`;

export const getSlotFillPercent = (slot: ActivitySlot): number =>
    Math.min(100, (slot.used / Math.max(slot.quantity, 1)) * 100);
