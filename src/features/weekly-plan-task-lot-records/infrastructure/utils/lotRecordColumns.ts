import { formatNumber } from "@/features/shared/shared";
import { formatRecordValue, type PalletValue, type PerformanceRecordColumn } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import type { WeeklyPlanTaskLotRecord } from "@/features/weekly-plan-task-lot-records/weekly-plan-task-lot-records";

export const LOT_SYSTEM_KEYS = [
    'entry_date', 'lot', 'recorded_at', 'intake_lbs', 'applied_raw_lbs', 'trimmed_lbs',
    'overripe_lbs', 'recovery_pct', 'overripe_pct', 'grn_balance', 'observations',
] as const;

export type LotSystemKey = typeof LOT_SYSTEM_KEYS[number];

export const LOT_PERCENT_KEYS = ['recovery_pct', 'overripe_pct'];

export const DEFAULT_LOT_RECORD_COLUMNS: PerformanceRecordColumn[] = [
    { key: 'lot', label: 'Lote (GRN)', data_type: 'text', is_calculated: false },
    { key: 'applied_raw_lbs', label: 'MP aplicada', data_type: 'number', is_calculated: false },
    { key: 'trimmed_lbs', label: 'Libras recortadas', data_type: 'number', is_calculated: false },
    { key: 'recovery_pct', label: '% Recuperación', data_type: 'number', is_calculated: true },
];

export const isLotSystemKey = (key: string): key is LotSystemKey =>
    (LOT_SYSTEM_KEYS as readonly string[]).includes(key);

export const isLotPercentKey = (key: string): boolean => LOT_PERCENT_KEYS.includes(key);

export const getLotRecordValue = (record: WeeklyPlanTaskLotRecord, key: string): PalletValue =>
    isLotSystemKey(key) ? record[key] : record.extra_values[key] ?? null;

export const formatPercent = (value: number): string => `${formatNumber(Math.round(value * 100) / 100)}%`;

export function formatLotRecordValue(column: PerformanceRecordColumn, value: PalletValue): string {
    if (typeof value === 'number' && isLotPercentKey(column.key)) return formatPercent(value);
    return formatRecordValue(column, value);
}
