import { formatNumber } from "@/features/shared/shared";
import type { DifferenceTone } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

export const DIFFERENCE_TONE_TEXT: Record<DifferenceTone, string> = {
    under: 'text-[#a3402f]',
    over: 'text-[#4d6b2f]',
    even: 'text-ink-muted'
};

export const DIFFERENCE_TONE_BAR: Record<DifferenceTone, string> = {
    under: 'bg-[#a3402f]',
    over: 'bg-[#4d6b2f]',
    even: 'bg-ink-subtle'
};

const roundPounds = (value: number) => Math.round(value * 100) / 100;

export const formatPounds = (value: number) => formatNumber(roundPounds(value));

export function formatSignedPounds(value: number): string {
    const rounded = roundPounds(value);
    if (rounded > 0) return `+${formatNumber(rounded)}`;
    if (rounded < 0) return `−${formatNumber(Math.abs(rounded))}`;
    return '0';
}

export function formatSignedPercent(ratio: number): string {
    const percent = Math.round(ratio * 1000) / 10;
    if (percent > 0) return `+${percent}%`;
    if (percent < 0) return `−${Math.abs(percent)}%`;
    return '0%';
}

export const toNullableNumber = (value: unknown): number | null =>
    value === '' || value === null || value === undefined ? null : Number(value);
