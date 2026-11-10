import type { LotYieldSegment } from "@/features/weekly-plan-task-lot-records/weekly-plan-task-lot-records";

export function getProductYieldSegments(rawLbs: number | null, trimmedLbs: number | null, rejectedLbs: number | null): LotYieldSegment[] | null {
    if (rawLbs === null || rawLbs <= 0 || (trimmedLbs === null && rejectedLbs === null)) return null;

    const trimmed = Math.min(((trimmedLbs ?? 0) / rawLbs) * 100, 100);
    const rejected = Math.min(((rejectedLbs ?? 0) / rawLbs) * 100, 100 - trimmed);

    return [
        { key: 'trimmed', label: 'Recortado', percent: trimmed },
        { key: 'rejected', label: 'Rechazo', percent: rejected },
        { key: 'waste', label: 'Merma', percent: Math.max(100 - trimmed - rejected, 0) },
    ];
}
