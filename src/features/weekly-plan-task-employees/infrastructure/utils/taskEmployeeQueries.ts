import type { QueryClient } from "@tanstack/react-query";

export const taskEmployeesQueryKey = (taskId: string) => ['getWeeklyPlanTaskEmployees', taskId];

export const taskByIdQueryKey = (taskId: string) => ['getWeeklyPlanTaskById', taskId];

export function invalidateTaskEmployeeQueries(queryClient: QueryClient, taskId: string) {
    queryClient.invalidateQueries({ queryKey: taskEmployeesQueryKey(taskId) });
}

export const TASK_EMPLOYEE_ACTIVITY_PARAM = 'taskEmployeeActivity';
