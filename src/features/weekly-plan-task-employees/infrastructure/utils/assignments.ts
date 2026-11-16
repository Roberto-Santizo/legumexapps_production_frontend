import type { WeeklyPlanTaskEmployee } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

export const findAssignmentById = (assignments: WeeklyPlanTaskEmployee[], id: string | null): WeeklyPlanTaskEmployee | undefined =>
    assignments.find((assignment) => `${assignment.id}` === id);

export const formatPosition = (position: string | null): string => position ?? 'Sin posición';

export const getAssignmentActivityIds = (assignments: WeeklyPlanTaskEmployee[], excludeId?: number): (number | null)[] =>
    assignments.filter((assignment) => assignment.id !== excludeId).map((assignment) => assignment.line_activity_id);

export const countMissingActivities = (assignments: WeeklyPlanTaskEmployee[]): number =>
    assignments.filter((assignment) => assignment.line_activity_id === null).length;

export const getPositionActivityNote = (assignment: WeeklyPlanTaskEmployee): string | null =>
    assignment.position_activity && assignment.position_activity !== assignment.activity
        ? `Puesto: ${assignment.position_activity}`
        : null;
