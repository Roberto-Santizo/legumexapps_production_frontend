import type { EmployeeOption, WeeklyPlanEmployee } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

export const toEmployeeOption = (employee: WeeklyPlanEmployee): EmployeeOption => ({
    value: employee.id,
    label: `${employee.code} ${employee.name} ${employee.position}`,
    name: employee.name,
    code: employee.code,
    position: employee.position,
});

export const toEmployeeOptions = (employees: WeeklyPlanEmployee[], takenIds: Set<number>): EmployeeOption[] =>
    employees.filter((employee) => !takenIds.has(employee.id)).map(toEmployeeOption);

export const pickEmployeesByIds = (employees: WeeklyPlanEmployee[], ids: number[]): WeeklyPlanEmployee[] =>
    ids.flatMap((id) => employees.filter((employee) => employee.id === id));

export const findEmployeeById =(employees: WeeklyPlanEmployee[], id?: number): WeeklyPlanEmployee | undefined =>
    id === undefined ? undefined : employees.find((employee) => employee.id === id);
