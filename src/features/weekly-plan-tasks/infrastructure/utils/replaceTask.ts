import type { PaginatedWeeklyPlanTasks, WeeklyPlanTask } from "@/features/weekly-plan-tasks/weekly-plan-tasks";

export function replaceTask(list: PaginatedWeeklyPlanTasks | undefined, task: WeeklyPlanTask): PaginatedWeeklyPlanTasks | undefined {
    if (!list) return list;

    return { ...list, data: list.data.map((item) => item.id === task.id ? task : item) };
}
