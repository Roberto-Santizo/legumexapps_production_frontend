import type { ConfirmWeeklyPlanTaskEmployeesForm, WeeklyPlanEmployee, WeeklyPlanTaskEmployee, WeeklyPlanTaskEmployeeDatasource, WeeklyPlanTaskEmployeeForm, WeeklyPlanTaskEmployeeRepository } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

export class WeeklyPlanTaskEmployeeRepositoryImpl implements WeeklyPlanTaskEmployeeRepository {
    constructor(private datasource: WeeklyPlanTaskEmployeeDatasource) { }

    getAvailableEmployeesByTaskId(taskId: string): Promise<WeeklyPlanEmployee[]> {
        return this.datasource.getAvailableEmployeesByTaskId(taskId);
    }

    getEmployeesByTaskId(taskId: string): Promise<WeeklyPlanTaskEmployee[]> {
        return this.datasource.getEmployeesByTaskId(taskId);
    }

    getWeeklyPlanEmployees(): Promise<WeeklyPlanEmployee[]> {
        return this.datasource.getWeeklyPlanEmployees();
    }

    confirmEmployeesByTaskId(taskId: string, payload: ConfirmWeeklyPlanTaskEmployeesForm): Promise<string> {
        return this.datasource.confirmEmployeesByTaskId(taskId, payload);
    }

    addEmployeeByTaskId(taskId: string, payload: WeeklyPlanTaskEmployeeForm): Promise<string> {
        return this.datasource.addEmployeeByTaskId(taskId, payload);
    }

    replaceWeeklyPlanTaskEmployeeById(id: string, payload: WeeklyPlanTaskEmployeeForm): Promise<string> {
        return this.datasource.replaceWeeklyPlanTaskEmployeeById(id, payload);
    }

    deleteWeeklyPlanTaskEmployeeById(id: string): Promise<string> {
        return this.datasource.deleteWeeklyPlanTaskEmployeeById(id);
    }
}
