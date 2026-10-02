import type { WeeklyPlanTaskTimeout } from "@/features/weekly-plan-task-timeouts/weekly-plan-task-timeouts";

export const findOpenTimeout = (timeouts: WeeklyPlanTaskTimeout[]) => timeouts.find(timeout => timeout.is_open) ?? null;

export const sumClosedTimeoutHours = (timeouts: WeeklyPlanTaskTimeout[]) =>
    timeouts.reduce((total, timeout) => total + (timeout.duration_hours ?? 0), 0);

export const getElapsedMilliseconds = (startDate: string, now: number) => now - new Date(startDate).getTime();
