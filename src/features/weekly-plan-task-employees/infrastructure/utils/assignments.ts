import type { WeeklyPlanTaskEmployee } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

export const formatPosition = (position: string | null): string => position ?? 'Sin posición';

export const countMissingActivities = (assignments: WeeklyPlanTaskEmployee[]): number =>
    assignments.filter((assignment) => assignment.line_sku_activity_id === null).length;

export const findAssignmentByKey = (assignments: WeeklyPlanTaskEmployee[], key: string): WeeklyPlanTaskEmployee | undefined =>
    assignments.find((assignment) => `${assignment.id}` === key);
