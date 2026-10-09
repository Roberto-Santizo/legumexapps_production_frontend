import { getRecordValue, SUMMABLE_RECORD_KEYS, type WeeklyPlanTaskPerformanceRecord, type WeeklyPlanTaskPerformanceRecordsSummary } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

export type DifferenceTone = 'under' | 'over' | 'even';

export function getNextPalletNumber(records: WeeklyPlanTaskPerformanceRecord[]): number {
    const pallets = records.map(record => record.pallet_number ?? 0);
    return Math.max(0, ...pallets) + 1;
}

export function getPoundsPerBox(plannedPounds: number, plannedBoxes: number): number | null {
    return plannedPounds > 0 && plannedBoxes > 0 ? plannedPounds / plannedBoxes : null;
}

export function estimateTheoreticalPounds(boxes: number | null, poundsPerBox: number | null): number | null {
    return boxes !== null && boxes > 0 && poundsPerBox !== null ? boxes * poundsPerBox : null;
}

export function getPoundsProgress(recordedPounds: number, plannedPounds: number): number | null {
    return plannedPounds > 0 ? Math.min(recordedPounds / plannedPounds, 1) : null;
}

export function getDifferenceTone(difference: number): DifferenceTone {
    if (difference < 0) return 'under';
    if (difference > 0) return 'over';
    return 'even';
}

export function getDeviationRatio(difference: number, base: number): number {
    return base > 0 ? difference / base : 0;
}

export function getDeviationBarWidth(ratio: number, fullScale = 0.05): number {
    return Math.min(Math.abs(ratio) / fullScale, 1) * 50;
}

function sumRecordValues(records: WeeklyPlanTaskPerformanceRecord[], key: string): number | null {
    const values = records
        .map(record => getRecordValue(record, key))
        .filter((value): value is number => typeof value === 'number');

    return values.length > 0 ? values.reduce((total, value) => total + value, 0) : null;
}

export function summarizePerformanceRecords(records: WeeklyPlanTaskPerformanceRecord[]): WeeklyPlanTaskPerformanceRecordsSummary {
    return {
        count: records.length,
        totals: Object.fromEntries(SUMMABLE_RECORD_KEYS.map(key => [key, sumRecordValues(records, key)])),
        comparableTicketWeight: records
            .filter(record => record.difference !== null)
            .reduce((total, record) => total + (record.ticket_weight ?? 0), 0)
    };
}
