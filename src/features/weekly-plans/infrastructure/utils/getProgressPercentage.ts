export function getProgressPercentage(produced: number | null | undefined, planned: number | null | undefined) {
    const total = Number(planned ?? 0);
    if (total <= 0) return 0;
    const value = (Number(produced ?? 0) / total) * 100;
    return Math.min(100, Math.max(0, Math.round(value)));
}
