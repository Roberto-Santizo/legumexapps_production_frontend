import type { WeeklyPlanSummaryByDate } from "@/features/weekly-plans/weekly-plans";

type Props = {
    summary: WeeklyPlanSummaryByDate;
    dayTotal: number;
    onClick?: (code: string) => void;
}

export function WeeklyPlanLineSummaryCardComponent({ summary, dayTotal, onClick }: Props) {
    const share = dayTotal > 0 ? Math.round((summary.total_tasks / dayTotal) * 100) : 0;

    return (
        <article className="rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-line-strong" onClick={() => onClick?.(summary.line_code)}>
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-subtle">
                        {summary.line_code}
                    </p>

                    <h3 className="mt-1.5 text-sm font-semibold text-ink">
                        {summary.line_name}
                    </h3>
                </div>

                <p className="text-3xl font-semibold leading-none tabular-nums text-ink">
                    {summary.total_tasks}
                </p>
            </div>

            <div className="mt-5 h-0.75 w-full overflow-hidden rounded-full bg-line" aria-hidden="true">
                <div className="h-full rounded-full bg-ink" style={{ width: `${share}%` }} />
            </div>

            <p className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">
                {share}% de la carga del día
            </p>
        </article>
    );
}
