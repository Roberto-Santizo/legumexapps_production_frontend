import type { WeeklyPlanEmployee, WeeklyPlanEmployeeForm } from "@/features/weekly-plan-employees/weekly-plan-employees";

export const getWeeklyPlanEmployeeConflict = (employees: WeeklyPlanEmployee[], payload: WeeklyPlanEmployeeForm, excludeId?: number): string | null => {
    const others = employees.filter((employee) => employee.id !== excludeId);

    const sameEmployee = others.find((employee) => employee.employee_id === payload.employee_id);
    if (sameEmployee) return `El empleado ${sameEmployee.code} ya ocupa la posición ${sameEmployee.position} en este plan`;

    const samePosition = others.find((employee) => employee.position_id === payload.position_id);
    if (samePosition) return `La posición ${samePosition.position} ya está asignada a ${samePosition.code} ${samePosition.name} en este plan`;

    return null;
}
