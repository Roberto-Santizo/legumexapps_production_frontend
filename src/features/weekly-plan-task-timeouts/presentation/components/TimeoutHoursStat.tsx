import { formatDurationHours } from "@/features/weekly-plan-task-timeouts/weekly-plan-task-timeouts";

type Props = {
    timeoutHours: number;
    stopped: boolean;
}

export function TimeoutHoursStat({ timeoutHours, stopped }: Props) {
    return (
        <div className="flex items-baseline justify-between gap-3 px-5 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">Tiempo muerto</p>

            <div className="flex items-baseline gap-2">
                {stopped && (
                    <span className="size-1.5 self-center rounded-full bg-[#a3402f]" aria-label="Línea detenida" />
                )}
                <p className={`font-mono text-lg ${timeoutHours > 0 ? 'text-ink' : 'text-ink-subtle'}`}>
                    {formatDurationHours(timeoutHours)}
                </p>
            </div>
        </div>
    )
}
