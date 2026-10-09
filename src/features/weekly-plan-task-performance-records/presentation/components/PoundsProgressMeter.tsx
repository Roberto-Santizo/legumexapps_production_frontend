import { formatPounds, getPoundsProgress } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

type Props = {
    recorded: number;
    planned: number;
    label?: string;
}

export function PoundsProgressMeter({ recorded, planned, label = 'Libras registradas' }: Props) {
    const progress = getPoundsProgress(recorded, planned);
    const percent = progress === null ? null : Math.round(progress * 100);
    const complete = progress === 1;

    return (
        <div className="p-5">
            <div className="flex items-baseline justify-between gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">{label}</p>
                {percent !== null && (
                    <p className={`font-mono text-xs ${complete ? 'text-[#4d6b2f]' : 'text-ink-muted'}`}>{percent}%</p>
                )}
            </div>

            <p className="mt-2 font-mono text-3xl tracking-tight text-ink">
                {formatPounds(recorded)}
                <span className="text-lg text-ink-subtle">
                    {planned > 0 ? ` / ${formatPounds(planned)} lbs` : ' lbs'}
                </span>
            </p>

            {progress !== null && (
                <div
                    className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-canvas"
                    role="progressbar"
                    aria-label={label}
                    aria-valuenow={percent ?? 0}
                    aria-valuemin={0}
                    aria-valuemax={100}
                >
                    <div
                        className={`h-full rounded-full transition-[width] duration-500 ease-out motion-reduce:transition-none ${complete ? 'bg-[#4d6b2f]' : 'bg-ink'}`}
                        style={{ width: `${progress * 100}%` }}
                    />
                </div>
            )}

            <p className="mt-2 text-xs text-ink-muted">
                {progress === null
                    ? 'El SKU no tiene presentación configurada; solo se muestra lo registrado'
                    : complete ? 'Meta alcanzada' : `Faltan ${formatPounds(planned - recorded)} lbs`}
            </p>
        </div>
    )
}
