import type { QueryClient } from "@tanstack/react-query";

export const taskEmployeesQueryKey = (taskId: string) => ['getWeeklyPlanTaskEmployees', taskId];

export const taskAvailableEmployeesQueryKey = (taskId: string) => ['getWeeklyPlanTaskAvailableEmployees', taskId];

export const taskByIdQueryKey = (taskId: string) => ['getWeeklyPlanTaskById', taskId];

export const invalidateTaskEmployeeQueries = (queryClient: QueryClient, taskId: string): Promise<void> =>
    queryClient.invalidateQueries({ queryKey: taskEmployeesQueryKey(taskId) });
