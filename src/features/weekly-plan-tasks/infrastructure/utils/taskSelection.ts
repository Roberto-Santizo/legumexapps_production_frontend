import type { WeeklyPlanTask } from "@/features/weekly-plan-tasks/weekly-plan-tasks";

export const taskHoursFormat = new Intl.NumberFormat("es-GT");

export function getTaskIds(tasks: WeeklyPlanTask[]): string[] {
    return tasks.map((task) => String(task.id));
}

export function toggleId(ids: string[], id: string): string[] {
    return ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id];
}

export function setIdsSelection(ids: string[], groupIds: string[], select: boolean): string[] {
    return select ? Array.from(new Set([...ids, ...groupIds])) : ids.filter((id) => !groupIds.includes(id));
}

export function areAllTasksSelected(tasks: WeeklyPlanTask[], selectedIds: string[]): boolean {
    return tasks.every((task) => selectedIds.includes(String(task.id)));
}

export function sumSelectedTaskHours(tasks: WeeklyPlanTask[], selectedIds: string[]): number {
    return tasks
        .filter((task) => selectedIds.includes(String(task.id)))
        .reduce((acc, task) => acc + task.hours, 0);
}
