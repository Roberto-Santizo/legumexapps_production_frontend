import { DeviationCell, formatPounds, type WeeklyPlanTaskPerformanceRecordsSummary } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

type Props = {
    summary: WeeklyPlanTaskPerformanceRecordsSummary;
    editable: boolean;
}

export function PerformanceRecordsTotalsRow({ summary, editable }: Props) {
    return (
        <tr className="border-t border-line-strong bg-canvas/70">
            <td className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle" colSpan={2}>
                Total · {summary.count} {summary.count === 1 ? 'toma' : 'tomas'}
            </td>

            <td className="px-5 py-3.5 text-right font-mono text-sm font-semibold tabular-nums text-ink">
                {formatPounds(summary.weighedPounds)}
            </td>

            <td className="px-5 py-3.5 text-right font-mono text-sm tabular-nums text-ink-muted">
                {summary.hasTheoretical ? formatPounds(summary.theoreticalPounds) : '—'}
            </td>

            <td className="px-5 py-3.5">
                <DeviationCell difference={summary.differencePounds} theoretical={summary.theoreticalPounds} />
            </td>

            <td colSpan={editable ? 2 : 1} />
        </tr>
    )
}
