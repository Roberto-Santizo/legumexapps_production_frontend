import { ActionsMenu, FadeInUp } from "@/features/shared/shared";
import { CalendarIcon, EditIcon, MapPinIcon, TrashIcon } from "lucide-react";
import type { Dispatch } from "react";
import type { DraftWeeklyPlanTask } from "@/features/draft-weekly-plan-tasks/draft-weekly-plan-tasks";

type Props = {
    task: DraftWeeklyPlanTask;
    setTaskId: Dispatch<React.SetStateAction<string>>;
    deleteTask: (id: string) => void;
}

const numberFormat = new Intl.NumberFormat('es-GT', { maximumFractionDigits: 2 });

export function DraftWeeklyPlanTaskComponent({ task, setTaskId, deleteTask }: Props) {
    return (
        <FadeInUp>
            <article className="group overflow-hidden rounded-xl border border-line bg-surface transition hover:border-line-strong hover:shadow-sm">
                <header className="flex items-center justify-between gap-2 border-b border-dashed border-line bg-canvas/60 px-3 py-1.5">
                    {task.line_name ? (
                        <span className="inline-flex min-w-0 items-center gap-1.5 text-xs text-ink-muted">
                            {task.line_code && (
                                <span className="shrink-0 rounded bg-ink px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-wide text-surface">{task.line_code}</span>
                            )}
                            <span className="truncate">{task.line_name}</span>
                        </span>
                    ) : (
                        <span className="rounded border border-dashed border-line-strong px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-ink-subtle">Sin línea</span>
                    )}

                    <div className="-mr-1 shrink-0 opacity-70 transition group-hover:opacity-100 group-focus-within:opacity-100">
                        <ActionsMenu
                            items={[
                                { label: "Editar", icon: <EditIcon />, onClick: () => setTaskId(`${task.id}`), danger: false },
                                { label: "Eliminar", icon: <TrashIcon />, onClick: () => deleteTask(`${task.id}`), danger: true },
                            ]}
                        />
                    </div>
                </header>

                <div className="space-y-2 px-3 pt-2.5 pb-3">
                    <div className="min-w-0">
                        <p className="line-clamp-2 text-sm font-semibold leading-snug text-ink" title={task.sku_name}>{task.sku_name}</p>
                        <p className="mt-0.5 font-mono text-[11px] text-ink-subtle">{task.sku_code}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted">
                        <span className="inline-flex min-w-0 items-center gap-1">
                            <MapPinIcon className="size-3.5 shrink-0 text-ink-subtle" />
                            <span className="truncate">{task.destination}</span>
                        </span>
                        <span className="inline-flex items-center gap-1">
                            <CalendarIcon className="size-3.5 shrink-0 text-ink-subtle" />
                            <span className="tabular-nums">{task.operation_date_string}</span>
                        </span>
                    </div>
                </div>

                <dl className="grid grid-cols-2 divide-x divide-line border-t border-line">
                    <div className="px-3 py-2">
                        <dt className="text-[10px] font-medium uppercase tracking-wider text-ink-subtle">Cajas</dt>
                        <dd className="text-base font-semibold tabular-nums text-ink">{numberFormat.format(task.boxes)}</dd>
                    </div>
                    <div className="px-3 py-2">
                        <dt className="text-[10px] font-medium uppercase tracking-wider text-ink-subtle">Horas</dt>
                        <dd className="text-base font-semibold tabular-nums text-ink">{numberFormat.format(task.hours)}</dd>
                    </div>
                </dl>
            </article>
        </FadeInUp>
    )
}
