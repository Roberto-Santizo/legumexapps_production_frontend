import type { WeeklyPlanTaskPerformanceRecord, WeeklyPlanTaskPerformanceRecordsSummary } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

export type DifferenceTone = 'under' | 'over' | 'even';

export const hasTheoretical = (record: Pick<WeeklyPlanTaskPerformanceRecord, 'theoretical_pounds'>) => record.theoretical_pounds > 0;

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

export function getDeviationRatio(difference: number, theoretical: number): number {
    return theoretical > 0 ? difference / theoretical : 0;
}

export function getDeviationBarWidth(ratio: number, fullScale = 0.05): number {
    return Math.min(Math.abs(ratio) / fullScale, 1) * 50;
}

export function summarizePerformanceRecords(records: WeeklyPlanTaskPerformanceRecord[]): WeeklyPlanTaskPerformanceRecordsSummary {
    const comparable = records.filter(hasTheoretical);

    return {
        count: records.length,
        weighedPounds: records.reduce((total, record) => total + record.weighed_pounds, 0),
        theoreticalPounds: comparable.reduce((total, record) => total + record.theoretical_pounds, 0),
        differencePounds: comparable.reduce((total, record) => total + record.difference_pounds, 0),
        hasTheoretical: comparable.length > 0
    };
}
