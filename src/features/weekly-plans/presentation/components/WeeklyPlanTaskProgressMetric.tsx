import { getProgressPercentage } from "@/features/weekly-plans/weekly-plans";

type Props = {
    label: string;
    produced: number | null | undefined;
    planned: number;
};

export function WeeklyPlanTaskProgressMetric({ label, produced, planned }: Props) {
    const percentage = getProgressPercentage(produced, planned);
    const isComplete = percentage >= 100;

    return (
        <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
                <span className="text-[11px] font-medium uppercase tracking-wider text-ink-subtle">
                    {label}
                </span>
                <span className="text-[11px] tabular-nums text-ink-subtle">
                    {percentage}%
                </span>
            </div>

            <p className="mt-0.5 font-mono text-sm tabular-nums text-ink">
                <span className="font-semibold">{produced ?? 0}</span>
                <span className="text-ink-subtle"> / {planned}</span>
            </p>

            <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-line">
                <div
                    className={`h-full rounded-full transition-[width] duration-500 ease-out ${isComplete ? 'bg-emerald-600' : 'bg-ink'}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
