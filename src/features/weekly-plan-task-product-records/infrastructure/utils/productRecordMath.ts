import type { ProductRecordEstimateInput, ProductRecordEstimateValues, ProductRecordsTotals, WeeklyPlanTaskProductRecord, WeeklyPlanTaskProductRecordsSummary } from "@/features/weekly-plan-task-product-records/weekly-plan-task-product-records";

type SummableProductKey = 'raw_lbs' | 'classified_lbs' | 'trimmed_lbs' | 'rejected_lbs' | 'packed_lbs';

const sumProductRecords = (records: WeeklyPlanTaskProductRecord[], key: SummableProductKey): number =>
    records.reduce((total, record) => total + (record[key] ?? 0), 0);

const toPercent = (part: number, base: number): number | null => base > 0 ? (part / base) * 100 : null;

export function summarizeProductRecords(records: WeeklyPlanTaskProductRecord[]): WeeklyPlanTaskProductRecordsSummary {
    const rawLbs = sumProductRecords(records, 'raw_lbs');
    const trimmedLbs = sumProductRecords(records, 'trimmed_lbs');
    const rejectedLbs = sumProductRecords(records, 'rejected_lbs');

    return {
        count: records.length,
        totals: {
            raw_lbs: rawLbs,
            classified_lbs: sumProductRecords(records, 'classified_lbs'),
            trimmed_lbs: trimmedLbs,
            rejected_lbs: rejectedLbs,
            packed_lbs: sumProductRecords(records, 'packed_lbs'),
            recovery_pct: toPercent(trimmedLbs, rawLbs),
            rejection_pct: toPercent(rejectedLbs, rawLbs)
        }
    };
}

export const getProductTotalValue = (totals: ProductRecordsTotals, key: string): number | null | undefined =>
    key in totals ? totals[key as keyof ProductRecordsTotals] : undefined;

export function estimateProductRecordValues({ rawLbs, trimmedLbs, rejectedLbs }: ProductRecordEstimateInput): ProductRecordEstimateValues {
    return {
        recovery_pct: trimmedLbs !== null && rawLbs !== null ? toPercent(trimmedLbs, rawLbs) : null,
        rejection_pct: rejectedLbs !== null && rawLbs !== null ? toPercent(rejectedLbs, rawLbs) : null
    };
}

export const getProductEstimateValue = (estimate: ProductRecordEstimateValues, key: string): number | null =>
    key in estimate ? estimate[key as keyof ProductRecordEstimateValues] : null;
