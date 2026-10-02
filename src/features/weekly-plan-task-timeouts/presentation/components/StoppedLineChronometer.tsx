import { formatElapsed, useElapsedTime } from "@/features/weekly-plan-task-timeouts/weekly-plan-task-timeouts";

type Props = {
    startDate: string;
    className?: string;
}

export function StoppedLineChronometer({ startDate, className = 'text-2xl' }: Props) {
    const elapsed = useElapsedTime(startDate);

    return (
        <span className={`font-mono font-semibold tabular-nums tracking-tight text-[#a3402f] ${className}`} aria-live="off">
            {formatElapsed(elapsed)}
        </span>
    )
}
