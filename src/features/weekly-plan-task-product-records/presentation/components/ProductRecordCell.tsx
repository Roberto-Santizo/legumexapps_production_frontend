import { isNumericRecordColumn, type PerformanceRecordColumn } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { LotRecoveryValue } from "@/features/weekly-plan-task-lot-records/weekly-plan-task-lot-records";
import { formatProductRecordValue, getProductRecordValue, type WeeklyPlanTaskProductRecord } from "@/features/weekly-plan-task-product-records/weekly-plan-task-product-records";

type Props = {
    column: PerformanceRecordColumn;
    record: WeeklyPlanTaskProductRecord;
}

export function ProductRecordCell({ column, record }: Props) {
    if (column.key === 'recovery_pct') return (
        <td className="whitespace-nowrap px-5 py-3.5">
            <LotRecoveryValue percent={record.recovery_pct} />
        </td>
    );

    if (column.key === 'raw_material') return (
        <td className="px-5 py-3.5">
            {record.raw_material !== null
                ? <span className="block max-w-56 truncate text-sm font-semibold text-ink" title={record.raw_material}>{record.raw_material}</span>
                : <span className="font-mono text-sm text-ink-subtle">—</span>}
        </td>
    );

    const value = getProductRecordValue(record, column.key);
    const tone = value === null ? 'text-ink-subtle' : column.key === 'trimmed_lbs' ? 'text-ink' : 'text-ink-muted';

    if (isNumericRecordColumn(column)) return (
        <td className={`whitespace-nowrap px-5 py-3.5 text-right font-mono text-sm tabular-nums ${tone}`}>
            {formatProductRecordValue(column, value)}
        </td>
    );

    return (
        <td className={`px-5 py-3.5 text-sm ${tone}`}>
            <span className="block max-w-56 truncate" title={typeof value === 'string' ? value : undefined}>
                {formatProductRecordValue(column, value)}
            </span>
        </td>
    );
}
