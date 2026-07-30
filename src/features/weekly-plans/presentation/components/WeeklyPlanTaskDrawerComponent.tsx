import type { WeeklyPlanTask } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { SplitIcon } from "lucide-react";

type Props = {
    task: WeeklyPlanTask;
    toggleTaskSelection: (taskId: string) => void;
    selectedTasksIds: string[];
    onSplitTask?: (task: WeeklyPlanTask) => void;
}

export function WeeklyPlanTaskDrawerComponent({ task, toggleTaskSelection, selectedTasksIds, onSplitTask }: Props) {
    const selected = selectedTasksIds.includes(String(task.id));

    return (
        <label
            key={task.id}
            className={`group flex cursor-pointer gap-4 rounded-2xl border bg-white p-5 transition-all duration-200 ${selected ? "border-blue-500 ring-2 ring-blue-100" : "border-gray-200 hover:border-gray-300 hover:shadow-md"}`}
        >
            <input
                type="checkbox"
                checked={selected}
                onChange={() => toggleTaskSelection(String(task.id))}
                className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />

            <div className="flex-1">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-base font-semibold text-gray-900">
                            {task.sku_name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                            {task.operation_date_string}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                            {task.status}
                        </span>

                        {onSplitTask && (
                            <button
                                type="button"
                                onClick={(e) => { e.preventDefault(); onSplitTask(task); }}
                                title="Dividir Tarea"
                                className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                                <SplitIcon className="size-4" />
                            </button>
                        )}
                    </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-6">
                    <div>
                        <p className="text-xs uppercase tracking-wide text-gray-400">
                            Línea
                        </p>

                        <p className="mt-1 font-medium text-gray-800">
                            {task.line_name}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-wide text-gray-400">
                            Destino
                        </p>

                        <p className="mt-1 font-medium text-gray-800">
                            {task.destination}
                        </p>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                    <div className="rounded-xl bg-gray-50 p-4">
                        <p className="text-xs text-gray-500">
                            Cajas
                        </p>

                        <p className="mt-2 text-xl font-semibold text-gray-900">
                            {task.produced_boxes ?? 0}

                            <span className="ml-1 text-sm font-normal text-gray-400">
                                / {task.boxes}
                            </span>
                        </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-4">
                        <p className="text-xs text-gray-500">
                            Pallets
                        </p>

                        <p className="mt-2 text-xl font-semibold text-gray-900">
                            {task.produced_pallets ?? 0}

                            <span className="ml-1 text-sm font-normal text-gray-400">
                                / {task.pallets}
                            </span>
                        </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-4">
                        <p className="text-xs text-gray-500">
                            Horas
                        </p>

                        <p className="mt-2 text-xl font-semibold text-gray-900">
                            {task.hours}
                        </p>
                    </div>
                </div>
            </div>
        </label>
    );
}
