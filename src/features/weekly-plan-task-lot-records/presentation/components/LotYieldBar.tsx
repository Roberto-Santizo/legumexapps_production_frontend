import { formatPercent, LOT_YIELD_SEGMENT_BG, LOT_YIELD_SEGMENT_DOT, type LotYieldSegment } from "@/features/weekly-plan-task-lot-records/weekly-plan-task-lot-records";

type Props = {
    segments: LotYieldSegment[];
}

export function LotYieldBar({ segments }: Props) {
    return (
        <div className="space-y-2">
            <div
                className="flex h-2 w-full overflow-hidden rounded-full bg-canvas"
                role="img"
                aria-label={segments.map(segment => `${segment.label} ${formatPercent(segment.percent)}`).join(', ')}
            >
                {segments.map(segment => (
                    <span
                        key={segment.key}
                        className={`h-full transition-[width] duration-300 ease-out motion-reduce:transition-none ${LOT_YIELD_SEGMENT_BG[segment.key]}`}
                        style={{ width: `${segment.percent}%` }}
                    />
                ))}
            </div>

            <ul className="flex flex-wrap gap-x-4 gap-y-1">
                {segments.map(segment => (
                    <li key={segment.key} className="flex items-center gap-1.5 text-xs text-ink-muted">
                        <span className={`size-2 rounded-full ${LOT_YIELD_SEGMENT_DOT[segment.key]}`} aria-hidden="true" />
                        {segment.label}
                        <span className="font-mono tabular-nums text-ink">{formatPercent(segment.percent)}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
