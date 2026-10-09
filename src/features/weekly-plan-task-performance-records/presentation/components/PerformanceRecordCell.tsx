import { DeviationCell, formatRecordValue, getRecordValue, isNumericRecordColumn, type PerformanceRecordColumn, type WeeklyPlanTaskPerformanceRecord } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

type Props = {
    column: PerformanceRecordColumn;
    record: WeeklyPlanTaskPerformanceRecord;
}

export function PerformanceRecordCell({ column, record }: Props) {
    if (column.key === 'difference') return (
        <td className="px-5 py-3.5">
            <DeviationCell difference={record.difference} base={record.ticket_weight} />
        </td>
    );

    if (column.key === 'pallet_number') return (
        <td className="px-5 py-3.5">
            {record.pallet_number !== null
                ? <span className="font-mono text-sm font-semibold tabular-nums text-ink">#{record.pallet_number}</span>
                : <span className="font-mono text-sm text-ink-subtle">—</span>}
        </td>
    );

    const value = getRecordValue(record, column.key);
    const tone = value === null ? 'text-ink-subtle' : column.key === 'net_weight' ? 'text-ink' : 'text-ink-muted';

    if (isNumericRecordColumn(column)) return (
        <td className={`whitespace-nowrap px-5 py-3.5 text-right font-mono text-sm tabular-nums ${tone}`}>
            {formatRecordValue(column, value)}
        </td>
    );

    return (
        <td className={`px-5 py-3.5 text-sm ${tone}`}>
            <span className="block max-w-56 truncate" title={typeof value === 'string' ? value : undefined}>
                {formatRecordValue(column, value)}
            </span>
        </td>
    );
}
