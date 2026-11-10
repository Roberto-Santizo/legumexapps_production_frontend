import type { PerformanceRecordColumn } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { LotRecoveryValue } from "@/features/weekly-plan-task-lot-records/weekly-plan-task-lot-records";
import { formatProductRecordValue, getProductTotalValue, type WeeklyPlanTaskProductRecordsSummary } from "@/features/weekly-plan-task-product-records/weekly-plan-task-product-records";

type Props = {
    summary: WeeklyPlanTaskProductRecordsSummary;
    columns: PerformanceRecordColumn[];
    editable: boolean;
}

export function ProductRecordsTotalsRow({ summary, columns, editable }: Props) {
    return (
        <tr className="border-t border-line-strong bg-canvas/70">
            <td className="whitespace-nowrap px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
                Total · {summary.count} {summary.count === 1 ? 'producto' : 'productos'}
            </td>

            {columns.slice(1).map(column => {
                const total = getProductTotalValue(summary.totals, column.key);

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
                        {formatProductRecordValue(column, total)}
                    </td>
                );
            })}

            <td colSpan={editable ? 2 : 1} />
        </tr>
    )
}
