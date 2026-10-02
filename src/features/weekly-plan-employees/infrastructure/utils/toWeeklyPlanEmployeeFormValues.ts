import type { WeeklyPlanEmployee, WeeklyPlanEmployeeForm } from "@/features/weekly-plan-employees/weekly-plan-employees";

export const toWeeklyPlanEmployeeFormValues = ({ position_id, employee_id }: WeeklyPlanEmployee): Partial<WeeklyPlanEmployeeForm> => ({
    position_id,
    employee_id
});
