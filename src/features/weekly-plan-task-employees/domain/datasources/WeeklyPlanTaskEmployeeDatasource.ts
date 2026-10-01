import type { ConfirmWeeklyPlanTaskEmployeesForm, WeeklyPlanEmployee, WeeklyPlanTaskEmployee, WeeklyPlanTaskEmployeeForm } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

export abstract class WeeklyPlanTaskEmployeeDatasource {
    abstract getAvailableEmployeesByTaskId(taskId: string): Promise<WeeklyPlanEmployee[]>;
    abstract getEmployeesByTaskId(taskId: string): Promise<WeeklyPlanTaskEmployee[]>;
    abstract getWeeklyPlanEmployees(): Promise<WeeklyPlanEmployee[]>;
    abstract confirmEmployeesByTaskId(taskId: string, payload: ConfirmWeeklyPlanTaskEmployeesForm): Promise<string>;
    abstract addEmployeeByTaskId(taskId: string, payload: WeeklyPlanTaskEmployeeForm): Promise<string>;
    abstract replaceWeeklyPlanTaskEmployeeById(id: string, payload: WeeklyPlanTaskEmployeeForm): Promise<string>;
    abstract deleteWeeklyPlanTaskEmployeeById(id: string): Promise<string>;
}
