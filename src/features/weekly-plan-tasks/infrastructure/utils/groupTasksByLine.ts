import type { WeeklyPlanTask } from "@/features/weekly-plan-tasks/weekly-plan-tasks";

export type WeeklyPlanTaskGroup = {
    line: string;
    tasks: WeeklyPlanTask[];
}

export function groupTasksByLine(tasks: WeeklyPlanTask[]): WeeklyPlanTaskGroup[] {
    const groups = new Map<string, WeeklyPlanTask[]>();
    tasks.forEach((task) => {
        groups.set(task.line_name, [...(groups.get(task.line_name) ?? []), task]);
    });
    return Array.from(groups, ([line, tasks]) => ({ line, tasks }));
}
