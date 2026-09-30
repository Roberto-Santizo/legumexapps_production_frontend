import { useCallback, useState } from "react";
import { getTaskIds, setIdsSelection, toggleId, type WeeklyPlanTask } from "@/features/weekly-plan-tasks/weekly-plan-tasks";

export function useTaskSelection() {
    const [selectedTasksIds, setSelectedTasksIds] = useState<string[]>([]);

    const toggleTaskSelection = (taskId: string) => setSelectedTasksIds((prev) => toggleId(prev, taskId));

    const setGroupSelection = (tasks: WeeklyPlanTask[], select: boolean) =>
        setSelectedTasksIds((prev) => setIdsSelection(prev, getTaskIds(tasks), select));

    const clearSelection = useCallback(() => setSelectedTasksIds([]), []);

    return { selectedTasksIds, toggleTaskSelection, setGroupSelection, clearSelection };
}
