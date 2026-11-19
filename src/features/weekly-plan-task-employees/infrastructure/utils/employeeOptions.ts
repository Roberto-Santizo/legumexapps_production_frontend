import type { EmployeeOption, WeeklyPlanEmployee } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

export const REPLACEMENT_LINE_CODE = 'LDC';

export const toEmployeeOption = (employee: WeeklyPlanEmployee): EmployeeOption => ({
    value: employee.id,
    label: `${employee.code} ${employee.name} ${employee.position}`,
    name: employee.name,
    code: employee.code,
    position: employee.position,
});

export const toEmployeeOptions = (employees: WeeklyPlanEmployee[], takenIds: Set<string>): EmployeeOption[] =>
    employees
        .filter((employee) => !takenIds.has(employee.id))
        .map(toEmployeeOption);

export const findEmployeeById = (employees: WeeklyPlanEmployee[], id?: string): WeeklyPlanEmployee | undefined =>
    id === undefined ? undefined : employees.find((employee) => employee.id === id);
