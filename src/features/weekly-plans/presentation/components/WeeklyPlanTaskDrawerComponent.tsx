import type { WeeklyPlanTask } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { CalendarDaysIcon, CheckIcon, SplitIcon } from "lucide-react";

type Props = {
    task: WeeklyPlanTask;
    toggleTaskSelection: (taskId: string) => void;
    selectedTasksIds: string[];
    onSplitTask?: (task: WeeklyPlanTask) => void;
}

type ProgressMetricProps = {
    label: string;
    produced: number;
    planned: number;
}

function ProgressMetric({ label, produced, planned }: ProgressMetricProps) {
    const percentage = planned > 0 ? Math.min(Math.round((produced / planned) * 100), 100) : 0;

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between gap-2">
                <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-subtle">
                    {label}
                </span>
                <span className="font-mono text-[11px] tabular-nums text-ink-subtle">
                    {percentage}%
                </span>
            </div>

            <p className="font-mono text-lg font-semibold leading-none tabular-nums text-ink">
                {produced}
                <span className="ml-1 text-xs font-normal text-ink-subtle">
                    / {planned}
                </span>
            </p>

            <div className="h-1 w-full overflow-hidden rounded-full bg-line">
                <div
                    className="h-full rounded-full bg-ink transition-[width] duration-500 ease-out motion-reduce:transition-none"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}

export function WeeklyPlanTaskDrawerComponent({ task, toggleTaskSelection, selectedTasksIds, onSplitTask }: Props) {
    const selected = selectedTasksIds.includes(String(task.id));

    return (
        <label
            key={task.id}
            className={`group relative flex cursor-pointer gap-4 overflow-hidden rounded-xl border p-4 transition-colors duration-150 ${selected ? "border-ink bg-canvas/60" : "border-line bg-surface hover:border-line-strong"}`}
        >
            <span
                aria-hidden
                className={`absolute inset-y-0 left-0 w-1 transition-colors duration-150 ${selected ? "bg-ink" : "bg-transparent group-hover:bg-line-strong"}`}
            />

            <input
                type="checkbox"
                checked={selected}
                onChange={() => toggleTaskSelection(String(task.id))}
                className="peer sr-only"
            />

            <span
                aria-hidden
                className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors duration-150 peer-focus-visible:ring-2 peer-focus-visible:ring-ink/20 peer-focus-visible:ring-offset-2 ${selected ? "border-ink bg-ink text-surface" : "border-line-strong bg-surface text-transparent group-hover:border-ink-subtle"}`}
            >
                <CheckIcon className="size-3.5" strokeWidth={3} />
            </span>

            <div className="flex min-w-0 flex-1 flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold text-ink" title={task.sku_name}>
                            {task.sku_name} - {task.sku_code}
                        </h3>

                        <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-muted">
                            <CalendarDaysIcon className="size-3.5 text-ink-subtle" />
                            {task.operation_date_string}
                        </p>
                    </div>

                    {onSplitTask && (
                        <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); onSplitTask(task); }}
                            title="Dividir tarea"
                            aria-label="Dividir tarea"
                            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-line bg-surface px-2 py-1 text-xs font-medium text-ink-muted transition-colors duration-150 hover:border-line-strong hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20"
                        >
                            <SplitIcon className="size-3.5" />
                            Dividir
                        </button>
                    )}
                </div>

                <dl className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                    <div className="flex items-center gap-1.5">
                        <dt className="text-ink-subtle">Línea</dt>
                        <dd className="font-medium text-ink">{task.line_name}</dd>
                    </div>

                    <span aria-hidden className="h-3 w-px bg-line-strong" />

                    <div className="flex items-center gap-1.5">
                        <dt className="text-ink-subtle">Destino</dt>
                        <dd className="font-medium text-ink">{task.destination}</dd>
                    </div>
                </dl>

                <div className="grid grid-cols-[1fr_1fr_auto] gap-5 border-t border-dashed border-line pt-4">
                    <ProgressMetric
                        label="Cajas"
                        produced={task.produced_boxes ?? 0}
                        planned={task.boxes}
                    />

                    <ProgressMetric
                        label="Pallets"
                        produced={task.produced_pallets ?? 0}
                        planned={task.pallets}
                    />

                    <div className="flex flex-col gap-2 border-l border-line pl-5">
                        <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-subtle">
                            Horas
                        </span>
                        <p className="font-mono text-lg font-semibold leading-none tabular-nums text-ink">
                            {task.hours}
                            <span className="ml-0.5 text-xs font-normal text-ink-subtle">h</span>
                        </p>
                    </div>
                </div>
            </div>
        </label>
    );
}
