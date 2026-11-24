export function toNullableNumber(value: unknown): number | null {
    if (value === '' || value === null || value === undefined) return null;

    const number = Number(value);

    return Number.isFinite(number) ? number : null;
}
