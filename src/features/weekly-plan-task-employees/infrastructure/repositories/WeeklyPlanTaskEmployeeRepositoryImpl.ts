import type { ConfirmWeeklyPlanTaskEmployeesForm, UpdateWeeklyPlanTaskEmployeeActivityForm, WeeklyPlanEmployee, WeeklyPlanTaskEmployee, WeeklyPlanTaskEmployeeDatasource, WeeklyPlanTaskEmployeeRepository } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

export class WeeklyPlanTaskEmployeeRepositoryImpl implements WeeklyPlanTaskEmployeeRepository {
    constructor(private datasource: WeeklyPlanTaskEmployeeDatasource) { }

    getAvailableEmployeesByTaskId(taskId: string): Promise<WeeklyPlanEmployee[]> {
        return this.datasource.getAvailableEmployeesByTaskId(taskId);
    }

    getEmployeesByTaskId(taskId: string): Promise<WeeklyPlanTaskEmployee[]> {
        return this.datasource.getEmployeesByTaskId(taskId);
    }

    confirmEmployeesByTaskId(taskId: string, payload: ConfirmWeeklyPlanTaskEmployeesForm): Promise<string> {
        return this.datasource.confirmEmployeesByTaskId(taskId, payload);
    }

    updateWeeklyPlanTaskEmployeeActivityById(id: string, payload: UpdateWeeklyPlanTaskEmployeeActivityForm): Promise<string> {
        return this.datasource.updateWeeklyPlanTaskEmployeeActivityById(id, payload);
    }

    deleteWeeklyPlanTaskEmployeeById(id: string): Promise<string> {
        return this.datasource.deleteWeeklyPlanTaskEmployeeById(id);
    }
}
