import type { ConfirmWeeklyPlanTaskEmployeesByPositionForm, ConfirmWeeklyPlanTaskEmployeesForm, UpdateWeeklyPlanTaskEmployeeActivityForm, WeeklyPlanEmployee, WeeklyPlanTaskEmployee } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

export abstract class WeeklyPlanTaskEmployeeRepository {
    abstract getAvailableEmployeesByTaskId(taskId: string): Promise<WeeklyPlanEmployee[]>;
    abstract getEmployeesByTaskId(taskId: string): Promise<WeeklyPlanTaskEmployee[]>;
    abstract confirmEmployeesByTaskId(taskId: string, payload: ConfirmWeeklyPlanTaskEmployeesForm): Promise<string>;
    abstract confirmEmployeesByPositionByTaskId(taskId: string, payload: ConfirmWeeklyPlanTaskEmployeesByPositionForm): Promise<string>;
    abstract updateWeeklyPlanTaskEmployeeActivityById(id: string, payload: UpdateWeeklyPlanTaskEmployeeActivityForm): Promise<string>;
    abstract deleteWeeklyPlanTaskEmployeeById(id: string): Promise<string>;
}
