import { formatNumber } from "@/features/shared/shared";
import type { LineField } from "@/features/line-fields/line-fields";
import { formatPounds, type PalletValue, type PerformanceRecordColumn, type WeeklyPlanTaskPerformanceRecord } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

export const PALLET_SYSTEM_KEYS = [
    'pallet_number', 'lot', 'recorded_at', 'boxes', 'liters', 'status',
    'scale_weight', 'tare', 'net_weight', 'ticket_weight', 'difference', 'observations',
] as const;

export type PalletSystemKey = typeof PALLET_SYSTEM_KEYS[number];

export const SUMMABLE_RECORD_KEYS = ['boxes', 'liters', 'scale_weight', 'tare', 'net_weight', 'ticket_weight', 'difference'];

export const DEFAULT_RECORD_COLUMNS: PerformanceRecordColumn[] = [
    { key: 'pallet_number', label: 'Tarima #', data_type: 'integer', is_calculated: false },
    { key: 'boxes', label: 'Cajas', data_type: 'integer', is_calculated: false },
    { key: 'net_weight', label: 'Peso neto', data_type: 'number', is_calculated: true },
    { key: 'ticket_weight', label: 'Peso boleta', data_type: 'number', is_calculated: true },
    { key: 'difference', label: 'Diferencial', data_type: 'number', is_calculated: true },
];

export const isPalletSystemKey = (key: string): key is PalletSystemKey =>
    (PALLET_SYSTEM_KEYS as readonly string[]).includes(key);

export const isSummableRecordKey = (key: string): boolean => SUMMABLE_RECORD_KEYS.includes(key);

export const isNumericRecordColumn = (column: PerformanceRecordColumn): boolean =>
    column.data_type === 'number' || column.data_type === 'integer';

export const toPerformanceRecordColumns = (fields: LineField[]): PerformanceRecordColumn[] =>
    fields.length > 0
        ? fields.map(({ key, label, data_type, is_calculated }) => ({ key, label, data_type, is_calculated }))
        : DEFAULT_RECORD_COLUMNS;

export const getRecordValue = (record: WeeklyPlanTaskPerformanceRecord, key: string): PalletValue =>
    isPalletSystemKey(key) ? record[key] : record.extra_values[key] ?? null;

export function formatRecordValue(column: PerformanceRecordColumn, value: PalletValue): string {
    if (value === null || value === '') return '—';
    if (typeof value === 'boolean') return value ? 'Sí' : 'No';
    if (typeof value === 'number') return column.data_type === 'integer' ? formatNumber(value) : formatPounds(value);
    return value;
}
