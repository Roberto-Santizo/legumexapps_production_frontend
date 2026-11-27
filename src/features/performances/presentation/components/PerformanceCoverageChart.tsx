import { buildPerformanceCoverage, PerformanceCoverageMeter, type Performance } from "@/features/performances/performances";

type Props = {
    performance: Pick<Performance, 'activities' | 'positions'>;
}

export function PerformanceCoverageChart({ performance }: Props) {
    const coverage = buildPerformanceCoverage(performance.positions, performance.activities);
    const hasExcess = coverage.excess > 0 || (coverage.available === 0 && coverage.created > 0);

    return (
        <figure className="w-full sm:w-72">
            <figcaption className="flex items-baseline justify-between gap-4">
                <span className="text-xs text-ink-muted">Posiciones / cupo de actividades</span>
                <span className="font-mono text-sm tabular-nums text-ink-subtle">
                    <span className="font-semibold text-ink">{coverage.created}</span>/{coverage.available}
                </span>
            </figcaption>

            <div className="mt-2">
                <PerformanceCoverageMeter coverage={coverage} />
            </div>

            <p className={`mt-1.5 flex justify-between gap-4 text-xs ${hasExcess ? 'text-amber-700' : 'text-ink-subtle'}`}>
                <span>{coverage.message}</span>
                {coverage.available > 0 && <span className="font-mono tabular-nums">{coverage.percentage}%</span>}
            </p>
        </figure>
    )
}
