import type { Activity, ActivityForm, UpdateActivityPayload } from "@/features/activities/activities";

export const toActivityForm = (activity: Activity): ActivityForm => ({
    name: activity.name,
    unit: activity.unit
});

export const toUpdateActivityPayload = (form: ActivityForm, activity: Activity): UpdateActivityPayload => {
    const payload: UpdateActivityPayload = {};

    if (form.name.trim().toUpperCase() !== activity.name) payload.name = form.name;
    if (form.unit.trim() !== activity.unit) payload.unit = form.unit;

    return payload;
}
