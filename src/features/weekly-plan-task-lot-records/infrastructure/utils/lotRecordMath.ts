import type { LotRecordEstimateInput, LotRecordEstimateValues, LotRecordsTotals, WeeklyPlanTaskLotRecord, WeeklyPlanTaskLotRecordsSummary } from "@/features/weekly-plan-task-lot-records/weekly-plan-task-lot-records";

type SummableLotKey = 'intake_lbs' | 'applied_raw_lbs' | 'trimmed_lbs' | 'overripe_lbs' | 'grn_balance';

const sumLotRecords = (records: WeeklyPlanTaskLotRecord[], key: SummableLotKey): number =>
    records.reduce((total, record) => total + (record[key] ?? 0), 0);

const toPercent = (part: number, base: number): number | null => base > 0 ? (part / base) * 100 : null;

export function summarizeLotRecords(records: WeeklyPlanTaskLotRecord[]): WeeklyPlanTaskLotRecordsSummary {
    const appliedRawLbs = sumLotRecords(records, 'applied_raw_lbs');
    const trimmedLbs = sumLotRecords(records, 'trimmed_lbs');
    const overripeLbs = sumLotRecords(records, 'overripe_lbs');

    return {
        count: records.length,
        totals: {
            intake_lbs: sumLotRecords(records, 'intake_lbs'),
            applied_raw_lbs: appliedRawLbs,
            trimmed_lbs: trimmedLbs,
            overripe_lbs: overripeLbs,
            recovery_pct: toPercent(trimmedLbs, appliedRawLbs),
            overripe_pct: toPercent(overripeLbs, appliedRawLbs),
            grn_balance: sumLotRecords(records, 'grn_balance')
        }
    };
}

export const getLotTotalValue = (totals: LotRecordsTotals, key: string): number | null | undefined =>
    key in totals ? totals[key as keyof LotRecordsTotals] : undefined;

export function estimateLotRecordValues({ intakeLbs, appliedRawLbs, trimmedLbs, overripeLbs }: LotRecordEstimateInput): LotRecordEstimateValues {
    return {
        recovery_pct: trimmedLbs !== null && appliedRawLbs !== null ? toPercent(trimmedLbs, appliedRawLbs) : null,
        overripe_pct: overripeLbs !== null && appliedRawLbs !== null ? toPercent(overripeLbs, appliedRawLbs) : null,
        grn_balance: intakeLbs !== null && appliedRawLbs !== null ? intakeLbs - appliedRawLbs : null
    };
}

export const getLotEstimateValue = (estimate: LotRecordEstimateValues, key: string): number | null =>
    key in estimate ? estimate[key as keyof LotRecordEstimateValues] : null;
