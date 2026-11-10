import { formatRecordValue, type PalletValue, type PerformanceRecordColumn } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { formatPercent } from "@/features/weekly-plan-task-lot-records/weekly-plan-task-lot-records";
import type { WeeklyPlanTaskProductRecord } from "@/features/weekly-plan-task-product-records/weekly-plan-task-product-records";

export const PRODUCT_SYSTEM_KEYS = [
    'raw_material', 'raw_lbs', 'classified_lbs', 'trimmed_lbs', 'rejected_lbs',
    'packed_lbs', 'recovery_pct', 'rejection_pct', 'observations',
] as const;

export type ProductSystemKey = typeof PRODUCT_SYSTEM_KEYS[number];

export const PRODUCT_PERCENT_KEYS = ['recovery_pct', 'rejection_pct'];

export const DEFAULT_PRODUCT_RECORD_COLUMNS: PerformanceRecordColumn[] = [
    { key: 'raw_material', label: 'Materia prima', data_type: 'text', is_calculated: false },
    { key: 'raw_lbs', label: 'Libras materia prima', data_type: 'number', is_calculated: false },
    { key: 'trimmed_lbs', label: 'Libras recortadas', data_type: 'number', is_calculated: false },
    { key: 'recovery_pct', label: '% Recuperación', data_type: 'number', is_calculated: true },
];

export const isProductSystemKey = (key: string): key is ProductSystemKey =>
    (PRODUCT_SYSTEM_KEYS as readonly string[]).includes(key);

export const isProductPercentKey = (key: string): boolean => PRODUCT_PERCENT_KEYS.includes(key);

export const getProductRecordValue = (record: WeeklyPlanTaskProductRecord, key: string): PalletValue =>
    isProductSystemKey(key) ? record[key] : record.extra_values[key] ?? null;

export function formatProductRecordValue(column: PerformanceRecordColumn, value: PalletValue): string {
    if (typeof value === 'number' && isProductPercentKey(column.key)) return formatPercent(value);
    return formatRecordValue(column, value);
}
