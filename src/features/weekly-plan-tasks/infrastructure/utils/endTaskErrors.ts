import type { AxiosError } from "axios";
import { WeeklyPlanTaskValidationError, type WeeklyPlanTaskEndForm, type WeeklyPlanTaskErrorResponse } from "@/features/weekly-plan-tasks/weekly-plan-tasks";

const END_TASK_FIELDS: (keyof WeeklyPlanTaskEndForm)[] = ['produced_boxes', 'weighed_pounds', 'waste_pounds'];

export function toEndTaskError(error: AxiosError<WeeklyPlanTaskErrorResponse>): Error {
    const data = error.response?.data;

    if (error.response?.status === 422 && data?.errors) return new WeeklyPlanTaskValidationError(data.message, data.errors);

    return new Error(data?.message);
}

export function getEndTaskFieldErrors(errors: Record<string, string[]>) {
    return END_TASK_FIELDS
        .filter((field) => errors[field]?.length)
        .map((field) => ({ field, message: errors[field][0] }));
}
