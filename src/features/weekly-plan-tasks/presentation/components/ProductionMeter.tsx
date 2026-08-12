import { formatNumber } from "@/features/shared/shared";

type MeterProps = {
    label: string;
    unit: string;
    produced: number | null;
    planned: number;
}

export function ProductionMeter({ label, unit, produced, planned }: MeterProps) {
    const done = produced ?? 0;
    const ratio = planned > 0 ? done / planned : 0;
    const percent = Math.round(ratio * 100);
    const complete = done >= planned && planned > 0;
    const pending = Math.max(planned - done, 0);

    return (
        <div className="p-5">
            <div className="flex items-baseline justify-between gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">{label}</p>
                <p className={`font-mono text-xs ${complete ? 'text-[#4d6b2f]' : 'text-ink-muted'}`}>{percent}%</p>
            </div>

            <p className="mt-2 font-mono text-3xl tracking-tight text-ink">
                {formatNumber(done)}
                <span className="text-lg text-ink-subtle"> / {formatNumber(planned)}</span>
            </p>

            <div
                className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-canvas"
                role="progressbar"
                aria-label={label}
                aria-valuenow={percent}
                aria-valuemin={0}
                aria-valuemax={100}
            >
                <div
                    className={`h-full rounded-full transition-[width] duration-500 ease-out motion-reduce:transition-none ${complete ? 'bg-[#4d6b2f]' : 'bg-ink'}`}
                    style={{ width: `${Math.min(ratio, 1) * 100}%` }}
                />
            </div>

            <p className="mt-2 text-xs text-ink-muted">
                {complete ? 'Meta alcanzada' : `Faltan ${formatNumber(pending)} ${unit}`}
            </p>
        </div>
    )
}
