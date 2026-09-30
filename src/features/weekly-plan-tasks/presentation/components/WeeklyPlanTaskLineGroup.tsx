import { FadeInLeft } from "@/features/shared/shared";
import { areAllTasksSelected, type WeeklyPlanTask, type WeeklyPlanTaskGroup } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { WeeklyPlanTaskDrawerComponent } from "@/features/weekly-plans/weekly-plans";
import { AnimatePresence } from "framer-motion";

type Props = {
    group: WeeklyPlanTaskGroup;
    selectedTasksIds: string[];
    toggleTaskSelection: (taskId: string) => void;
    setGroupSelection: (tasks: WeeklyPlanTask[], select: boolean) => void;
    onSplitTask: (task: WeeklyPlanTask) => void;
}

export function WeeklyPlanTaskLineGroup({ group, selectedTasksIds, toggleTaskSelection, setGroupSelection, onSplitTask }: Props) {
    const groupSelected = areAllTasksSelected(group.tasks, selectedTasksIds);

    return (
        <section aria-label={`Línea ${group.line}`}>
            <header className="mb-3 flex items-center gap-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-ink">
                    {group.line}
                </h3>
                <span className="font-mono text-[11px] tabular-nums text-ink-subtle">
                    {group.tasks.length}
                </span>
                <span aria-hidden className="h-px flex-1 bg-line" />
                <button
                    type="button"
                    onClick={() => setGroupSelection(group.tasks, !groupSelected)}
                    className="rounded-md px-1.5 py-0.5 text-xs font-medium text-ink-muted transition-colors duration-150 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20"
                >
                    {groupSelected ? "Quitar línea" : "Seleccionar línea"}
                </button>
            </header>

            <div className="space-y-3">
                <AnimatePresence>
                    {group.tasks.map((task) => (
                        <FadeInLeft key={task.id}>
                            <WeeklyPlanTaskDrawerComponent
                                task={task}
                                toggleTaskSelection={toggleTaskSelection}
                                selectedTasksIds={selectedTasksIds}
                                onSplitTask={onSplitTask}
                            />
                        </FadeInLeft>
                    ))}
                </AnimatePresence>
            </div>
        </section>
    );
}
