import { isNumericRecordColumn, type PerformanceRecordColumn } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { formatLotRecordValue, getLotRecordValue, LotRecoveryValue, type WeeklyPlanTaskLotRecord } from "@/features/weekly-plan-task-lot-records/weekly-plan-task-lot-records";

type Props = {
    column: PerformanceRecordColumn;
    record: WeeklyPlanTaskLotRecord;
}

export function LotRecordCell({ column, record }: Props) {
    if (column.key === 'recovery_pct') return (
        <td className="whitespace-nowrap px-5 py-3.5">
            <LotRecoveryValue percent={record.recovery_pct} />
        </td>
    );

    if (column.key === 'lot') return (
        <td className="whitespace-nowrap px-5 py-3.5">
            {record.lot !== null
                ? <span className="font-mono text-sm font-semibold text-ink">{record.lot}</span>
                : <span className="font-mono text-sm text-ink-subtle">—</span>}
        </td>
    );

    const value = getLotRecordValue(record, column.key);
    const tone = value === null ? 'text-ink-subtle' : column.key === 'trimmed_lbs' ? 'text-ink' : 'text-ink-muted';

    if (isNumericRecordColumn(column)) return (
        <td className={`whitespace-nowrap px-5 py-3.5 text-right font-mono text-sm tabular-nums ${tone}`}>
            {formatLotRecordValue(column, value)}
        </td>
    );

    return (
        <td className={`px-5 py-3.5 text-sm ${tone}`}>
            <span className="block max-w-56 truncate" title={typeof value === 'string' ? value : undefined}>
                {formatLotRecordValue(column, value)}
            </span>
        </td>
    );
}
