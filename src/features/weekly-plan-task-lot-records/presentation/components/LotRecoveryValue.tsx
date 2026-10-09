import { formatPercent } from "@/features/weekly-plan-task-lot-records/weekly-plan-task-lot-records";

type Props = {
    percent: number | null;
    emphasis?: boolean;
}

export function LotRecoveryValue({ percent, emphasis = false }: Props) {
    if (percent === null) return <div className="text-right font-mono text-sm text-ink-subtle">—</div>;

    return (
        <div className="flex items-center justify-end gap-3">
            <span className={`font-mono text-sm tabular-nums ${emphasis ? 'font-semibold text-ink' : 'text-ink'}`}>{formatPercent(percent)}</span>

            <span className="relative h-1.5 w-14 shrink-0 overflow-hidden rounded-full bg-canvas" aria-hidden="true">
                <span className="absolute inset-y-0 left-0 rounded-full bg-ink" style={{ width: `${Math.min(Math.max(percent, 0), 100)}%` }} />
            </span>
        </div>
    )
}
