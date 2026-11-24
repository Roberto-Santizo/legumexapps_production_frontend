import type { CaptureType } from "@/features/capture-fields/capture-fields";
import { toFiniteNumber, type WeeklyPlanTask, type WeeklyPlanTaskEndForm, type WeeklyPlanTaskEndPayload } from "@/features/weekly-plan-tasks/weekly-plan-tasks";

export const isWasteRequired = (captureType: CaptureType | undefined): boolean =>
    (captureType ?? 'pallet') === 'pallet';

export function toEndTaskPayload(form: WeeklyPlanTaskEndForm, task: WeeklyPlanTask): WeeklyPlanTaskEndPayload {
    const { waste_pounds, ...production } = form;
    const waste = toFiniteNumber(waste_pounds);

    if (waste === null && task.waste_pounds === null) return production;

    return { ...production, waste_pounds: waste };
}
