import { DeviationCell, formatRecordValue, isSummableRecordKey, type PerformanceRecordColumn, type WeeklyPlanTaskPerformanceRecordsSummary } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

type Props = {
    summary: WeeklyPlanTaskPerformanceRecordsSummary;
    columns: PerformanceRecordColumn[];
    editable: boolean;
}

export function PerformanceRecordsTotalsRow({ summary, columns, editable }: Props) {
    return (
        <tr className="border-t border-line-strong bg-canvas/70">
            <td className="whitespace-nowrap px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
                Total · {summary.count} {summary.count === 1 ? 'tarima' : 'tarimas'}
            </td>

            {columns.slice(1).map(column => {
                if (column.key === 'difference') return (
                    <td key={column.key} className="px-5 py-3.5">
                        <DeviationCell difference={summary.totals.difference ?? null} base={summary.comparableTicketWeight} />
                    </td>
                );

                if (!isSummableRecordKey(column.key)) return <td key={column.key} />;

                return (
                    <td
                        key={column.key}
                        className={`whitespace-nowrap px-5 py-3.5 text-right font-mono text-sm tabular-nums ${column.key === 'net_weight' ? 'font-semibold text-ink' : 'text-ink-muted'}`}
                    >
                        {formatRecordValue(column, summary.totals[column.key] ?? null)}
                    </td>
                );
            })}

            <td colSpan={editable ? 2 : 1} />
        </tr>
    )
}
