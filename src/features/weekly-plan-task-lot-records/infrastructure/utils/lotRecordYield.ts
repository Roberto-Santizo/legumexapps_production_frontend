export type LotYieldSegment = {
    key: 'trimmed' | 'overripe' | 'waste';
    label: string;
    percent: number;
}

export function getLotYieldSegments(appliedRawLbs: number | null, trimmedLbs: number | null, overripeLbs: number | null): LotYieldSegment[] | null {
    if (appliedRawLbs === null || appliedRawLbs <= 0 || (trimmedLbs === null && overripeLbs === null)) return null;

    const trimmed = Math.min(((trimmedLbs ?? 0) / appliedRawLbs) * 100, 100);
    const overripe = Math.min(((overripeLbs ?? 0) / appliedRawLbs) * 100, 100 - trimmed);

    return [
        { key: 'trimmed', label: 'Recortado', percent: trimmed },
        { key: 'overripe', label: 'Sobremaduro', percent: overripe },
        { key: 'waste', label: 'Merma', percent: Math.max(100 - trimmed - overripe, 0) },
    ];
}

export const LOT_YIELD_SEGMENT_BG: Record<LotYieldSegment['key'], string> = {
    trimmed: 'bg-ink',
    overripe: 'bg-[#a3402f]',
    waste: 'bg-transparent'
};

export const LOT_YIELD_SEGMENT_DOT: Record<LotYieldSegment['key'], string> = {
    trimmed: 'bg-ink',
    overripe: 'bg-[#a3402f]',
    waste: 'border border-line-strong bg-canvas'
};
