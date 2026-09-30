import { boxesFormat, type WeeklyPlanTask } from "@/features/weekly-plan-tasks/weekly-plan-tasks";

type Props = {
    task: WeeklyPlanTask;
}

export function SplitTaskSummary({ task }: Props) {
    return (
        <div className="flex items-end justify-between gap-4 border-b border-line pb-5">
            <div className="min-w-0">
                <p className="font-mono text-[11px] uppercase tracking-wider text-ink-subtle">
                    {task.sku_code} · {task.line_name}
                </p>
                <p className="mt-1 truncate text-base font-semibold text-ink">{task.sku_name}</p>
                <p className="text-sm text-ink-muted">{task.sku_client}</p>
            </div>
            <div className="shrink-0 text-right">
                <p className="font-mono text-2xl font-semibold leading-none tabular-nums text-ink">
                    {boxesFormat.format(task.boxes)}
                </p>
                <p className="mt-1 text-xs text-ink-subtle">cajas a dividir</p>
            </div>
        </div>
    );
}
