import { DIFFERENCE_TONE_BAR, DifferenceValue, formatSignedPercent, getDeviationBarWidth, getDeviationRatio, getDifferenceTone } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

type Props = {
    difference: number;
    theoretical: number;
}

export function DeviationCell({ difference, theoretical }: Props) {
    if (theoretical <= 0) return <DifferenceValue difference={null} />;

    const tone = getDifferenceTone(difference);
    const ratio = getDeviationRatio(difference, theoretical);
    const width = getDeviationBarWidth(ratio);

    return (
        <div className="flex items-center justify-end gap-3">
            <div className="text-right leading-tight">
                <DifferenceValue difference={difference} className="block text-sm" />
                <span className="font-mono text-[10px] tabular-nums text-ink-subtle">{formatSignedPercent(ratio)}</span>
            </div>

            <div className="relative h-1.5 w-16 shrink-0 rounded-full bg-canvas" aria-hidden="true">
                <span className="absolute -inset-y-1 left-1/2 w-px bg-line-strong" />
                <span
                    className={`absolute inset-y-0 ${DIFFERENCE_TONE_BAR[tone]} ${tone === 'under' ? 'rounded-l-full' : 'rounded-r-full'}`}
                    style={tone === 'under' ? { right: '50%', width: `${width}%` } : { left: '50%', width: `${width}%` }}
                />
            </div>
        </div>
    )
}
