import type { WeeklyPlanEmployee, WeeklyPlanTaskEmployee } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

export const getAssignedEmployeeIds = (employees: WeeklyPlanEmployee[], assignments: WeeklyPlanTaskEmployee[]): Set<string> => {
    const assignedCodes = new Set(assignments.map((assignment) => assignment.code));

    return new Set(employees.filter((employee) => assignedCodes.has(employee.code)).map((employee) => employee.id));
};

export const findAssignmentById = (assignments: WeeklyPlanTaskEmployee[], id: string | null): WeeklyPlanTaskEmployee | undefined =>
    assignments.find((assignment) => `${assignment.id}` === id);

export const formatReplacedEmployee = (assignment: WeeklyPlanTaskEmployee): string | null =>
    assignment.replaced_name ? `Reemplaza a ${assignment.replaced_name} (${assignment.replaced_code})` : null;
