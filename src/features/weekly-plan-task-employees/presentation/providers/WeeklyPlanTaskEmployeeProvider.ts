import { type ConfirmWeeklyPlanTaskEmployeesByPositionForm, type ConfirmWeeklyPlanTaskEmployeesForm, type PreviousEmployeesConfiguration, type UpdateWeeklyPlanTaskEmployeeActivityForm, type WeeklyPlanEmployee, type WeeklyPlanTaskEmployee, type WeeklyPlanTaskEmployeeRepository } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";
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

    getLastEmployeesConfigurationByLineCode(lineCode: string): Promise<PreviousEmployeesConfiguration> {
        return this.repository.getLastEmployeesConfigurationByLineCode(lineCode);
    }

    confirmEmployeesByTaskId(taskId: string, payload: ConfirmWeeklyPlanTaskEmployeesForm): Promise<string> {
        return this.repository.confirmEmployeesByTaskId(taskId, payload);
    }

    confirmEmployeesByPositionByTaskId(taskId: string, payload: ConfirmWeeklyPlanTaskEmployeesByPositionForm): Promise<string> {
        return this.repository.confirmEmployeesByPositionByTaskId(taskId, payload);
    }

    updateWeeklyPlanTaskEmployeeActivityById(id: string, payload: UpdateWeeklyPlanTaskEmployeeActivityForm): Promise<string> {
        return this.repository.updateWeeklyPlanTaskEmployeeActivityById(id, payload);
    }

    deleteWeeklyPlanTaskEmployeeById(id: string): Promise<string> {
        return this.repository.deleteWeeklyPlanTaskEmployeeById(id);
    }
}

const datasource = new WeeklyPlanTaskEmployeeDatasourceImpl(api);
const repository = new WeeklyPlanTaskEmployeeRepositoryImpl(datasource);
export const weeklyPlanTaskEmployeeProvider = new WeeklyPlanTaskEmployeeProvider(repository);
