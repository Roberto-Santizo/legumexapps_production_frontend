import type { PerformanceRecordColumn } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { formatLotRecordValue, getLotTotalValue, LotRecoveryValue, type WeeklyPlanTaskLotRecordsSummary } from "@/features/weekly-plan-task-lot-records/weekly-plan-task-lot-records";

type Props = {
    summary: WeeklyPlanTaskLotRecordsSummary;
    columns: PerformanceRecordColumn[];
    editable: boolean;
}

export function LotRecordsTotalsRow({ summary, columns, editable }: Props) {
    return (
        <tr className="border-t border-line-strong bg-canvas/70">
            <td className="whitespace-nowrap px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
                Total · {summary.count} {summary.count === 1 ? 'lote' : 'lotes'}
            </td>

            {columns.slice(1).map(column => {
                const total = getLotTotalValue(summary.totals, column.key);

                if (total === undefined) return <td key={column.key} />;

                if (column.key === 'recovery_pct') return (
                    <td key={column.key} className="whitespace-nowrap px-5 py-3.5">
                        <LotRecoveryValue percent={total} emphasis />
                    </td>
                );

                return (
                    <td
                        key={column.key}
                        className={`whitespace-nowrap px-5 py-3.5 text-right font-mono text-sm tabular-nums ${column.key === 'trimmed_lbs' ? 'font-semibold text-ink' : 'text-ink-muted'}`}
                    >
                        {formatLotRecordValue(column, total)}
                    </td>
                );
            })}

            <td colSpan={editable ? 2 : 1} />
        </tr>
    )
}
