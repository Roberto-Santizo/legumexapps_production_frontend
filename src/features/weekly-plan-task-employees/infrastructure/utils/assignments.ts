import type { WeeklyPlanTaskEmployee } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

export const getAssignedEmployeeIds = (assignments: WeeklyPlanTaskEmployee[]): Set<number> =>
    new Set(assignments.map((assignment) => assignment.weekly_plan_employee_id));

export const findAssignmentById = (assignments: WeeklyPlanTaskEmployee[], id: string | null): WeeklyPlanTaskEmployee | undefined =>
    assignments.find((assignment) => `${assignment.id}` === id);

export const formatReplacedEmployee = (assignment: WeeklyPlanTaskEmployee): string | null =>
    assignment.replaced_name ? `Reemplaza a ${assignment.replaced_name} (${assignment.replaced_code})` : null;
