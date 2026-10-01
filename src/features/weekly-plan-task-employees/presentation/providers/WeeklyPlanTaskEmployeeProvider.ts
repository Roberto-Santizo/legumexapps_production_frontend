import { type ConfirmWeeklyPlanTaskEmployeesForm, type WeeklyPlanEmployee, type WeeklyPlanTaskEmployee, type WeeklyPlanTaskEmployeeForm, type WeeklyPlanTaskEmployeeRepository } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";
import { WeeklyPlanTaskEmployeeDatasourceImpl, WeeklyPlanTaskEmployeeRepositoryImpl } from "@/features/weekly-plan-task-employees/infrastructure/infrastructure";
import api from "@/config/http/axios";

export class WeeklyPlanTaskEmployeeProvider {
    constructor(private repository: WeeklyPlanTaskEmployeeRepository) { }

    getAvailableEmployeesByTaskId(taskId: string): Promise<WeeklyPlanEmployee[]> {
        return this.repository.getAvailableEmployeesByTaskId(taskId);
    }

    getEmployeesByTaskId(taskId: string): Promise<WeeklyPlanTaskEmployee[]> {
        return this.repository.getEmployeesByTaskId(taskId);
    }

    getWeeklyPlanEmployees(): Promise<WeeklyPlanEmployee[]> {
        return this.repository.getWeeklyPlanEmployees();
    }

    confirmEmployeesByTaskId(taskId: string, payload: ConfirmWeeklyPlanTaskEmployeesForm): Promise<string> {
        return this.repository.confirmEmployeesByTaskId(taskId, payload);
    }

    addEmployeeByTaskId(taskId: string, payload: WeeklyPlanTaskEmployeeForm): Promise<string> {
        return this.repository.addEmployeeByTaskId(taskId, payload);
    }

    replaceWeeklyPlanTaskEmployeeById(id: string, payload: WeeklyPlanTaskEmployeeForm): Promise<string> {
        return this.repository.replaceWeeklyPlanTaskEmployeeById(id, payload);
    }

    deleteWeeklyPlanTaskEmployeeById(id: string): Promise<string> {
        return this.repository.deleteWeeklyPlanTaskEmployeeById(id);
    }
}

const datasource = new WeeklyPlanTaskEmployeeDatasourceImpl(api);
const repository = new WeeklyPlanTaskEmployeeRepositoryImpl(datasource);
export const weeklyPlanTaskEmployeeProvider = new WeeklyPlanTaskEmployeeProvider(repository);
