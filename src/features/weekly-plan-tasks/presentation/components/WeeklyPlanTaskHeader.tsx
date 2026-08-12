import { Title } from "@/features/shared/shared";
import type { WeeklyPlanTask } from "@/features/weekly-plan-tasks/weekly-plan-tasks";

type Props = {
    task: WeeklyPlanTask;
}

export function WeeklyPlanTaskHeader({ task }: Props) {
    return (
        <>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <Title title="Tarea de Plan Semanal" subtitle="Información de la tarea del plan semanal" />

                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium text-ink">
                    <span
                        className={`size-2 rounded-full`}
                        aria-hidden="true"
                    />
                    {task.status_message}
                </span>
            </div>
            <section className="grid grid-cols-1 divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface sm:grid-cols-2 sm:divide-x lg:grid-cols-4 lg:divide-y-0">
                <div className="p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">SKU</p>
                    <p className="mt-2 font-mono text-2xl tracking-tight text-ink">{task.sku_code}</p>
                    <p className="mt-1 text-sm text-ink-muted">{task.sku_name}</p>
                </div>

                <div className="p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">Línea</p>
                    <p className="mt-2 font-mono text-2xl tracking-tight text-ink">{task.line_code}</p>
                    <p className="mt-1 text-sm text-ink-muted">{task.line_name}</p>
                </div>

                <div className="p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">Destino</p>
                    <p className="mt-2 text-lg font-medium text-ink">{task.destination}</p>
                </div>

                <div className="p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">Día de operación</p>
                    <p className="mt-2 text-lg font-medium text-ink">{task.operation_date_string}</p>
                </div>
            </section>
        </>
    )
}
