import { buildPerformanceCoverage, staffingTone, type Performance } from "@/features/performances/performances";

type Props = {
    performance: Pick<Performance, 'activities' | 'positions'>;
}

export function PerformanceStaffingCell({ performance }: Props) {
    const coverage = buildPerformanceCoverage(performance.positions, performance.activities);

    return (
        <span className="inline-flex items-center gap-2 whitespace-nowrap" title={coverage.message}>
            <span className={`size-1.5 rounded-full ${staffingTone(coverage)}`} aria-hidden="true" />
            <span className="font-mono text-sm tabular-nums text-ink-subtle">
                <span className="font-semibold text-ink">{coverage.created}</span>/{coverage.available}
            </span>
            <span className="sr-only">{coverage.message}</span>
        </span>
    )
}
