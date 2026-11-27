import { coverageBarWidths, type PerformanceCoverage, type PerformanceCoverageSegment } from "@/features/performances/performances";

type Props = {
    coverage: PerformanceCoverage;
}

const segmentClasses: Record<PerformanceCoverageSegment, string> = {
    filled: 'bg-ink',
    empty: 'bg-line-strong',
    excess: 'bg-amber-500'
};

export function PerformanceCoverageMeter({ coverage }: Props) {
    const label = `${coverage.created} posiciones creadas de ${coverage.available} cupos de actividad`;

    if (coverage.segments) {
        return (
            <div role="img" aria-label={label} className="flex h-3 gap-[3px]">
                {coverage.segments.map((segment, index) => (
                    <span key={index} className={`flex-1 rounded-[2px] transition-colors duration-300 ${segmentClasses[segment]}`} />
                ))}
            </div>
        )
    }

    const widths = coverageBarWidths(coverage);

    return (
        <div role="img" aria-label={label} className="flex h-3 gap-[3px] overflow-hidden">
            {widths.filled > 0 && <span className="rounded-[2px] bg-ink transition-[width] duration-300" style={{ width: `${widths.filled}%` }} />}
            {widths.empty > 0 && <span className="flex-1 rounded-[2px] bg-line-strong" />}
            {widths.excess > 0 && <span className="rounded-[2px] bg-amber-500 transition-[width] duration-300" style={{ width: `${widths.excess}%` }} />}
        </div>
    )
}
