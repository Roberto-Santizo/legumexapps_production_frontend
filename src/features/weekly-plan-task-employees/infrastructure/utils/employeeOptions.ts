import { normalizeSearchText } from "@/features/shared/shared";
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

export const pickEmployeesByIds = (employees: WeeklyPlanEmployee[], ids: string[]): WeeklyPlanEmployee[] =>
    ids.flatMap((id) => employees.filter((employee) => employee.id === id));

export const findEmployeeById = (employees: WeeklyPlanEmployee[], id?: string): WeeklyPlanEmployee | undefined =>
    id === undefined ? undefined : employees.find((employee) => employee.id === id);

export const filterEmployeeOptions = (options: EmployeeOption[], term: string): EmployeeOption[] => {
    const query = normalizeSearchText(term);
    return query === '' ? options : options.filter((option) => normalizeSearchText(option.label).includes(query));
};

export const findEmployeeOption = (options: EmployeeOption[], value?: string): EmployeeOption | undefined =>
    value === undefined ? undefined : options.find((option) => option.value === value);
