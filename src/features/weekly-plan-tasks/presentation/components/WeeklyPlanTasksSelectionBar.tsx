import { taskHoursFormat } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarPlusIcon, XIcon } from "lucide-react";

type Props = {
    selectedCount: number;
    selectedHours: number;
    onClear: () => void;
    onAssignDate: () => void;
}

export function WeeklyPlanTasksSelectionBar({ selectedCount, selectedHours, onClear, onAssignDate }: Props) {
    return (
        <AnimatePresence>
            {selectedCount > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="sticky bottom-0 z-10 mt-6 -mb-2 pb-2"
                >
                    <div className="flex items-center gap-3 rounded-xl bg-ink p-2 pl-4 text-surface shadow-lg shadow-ink/20">
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold">
                                {selectedCount} {selectedCount === 1 ? "seleccionada" : "seleccionadas"}
                            </p>
                            <p className="font-mono text-[11px] tabular-nums text-surface/60">
                                {taskHoursFormat.format(selectedHours)} h de trabajo
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={onClear}
                            aria-label="Limpiar selección"
                            title="Limpiar selección"
                            className="flex size-9 items-center justify-center rounded-lg text-surface/70 transition-colors duration-150 hover:bg-surface/10 hover:text-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface/40"
                        >
                            <XIcon className="size-4" />
                        </button>

                        <button
                            type="button"
                            onClick={onAssignDate}
                            className="inline-flex items-center gap-2 rounded-lg bg-surface px-3.5 py-2 text-sm font-semibold text-ink transition-colors duration-150 hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface/40"
                        >
                            <CalendarPlusIcon className="size-4" />
                            Asignar fecha
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
