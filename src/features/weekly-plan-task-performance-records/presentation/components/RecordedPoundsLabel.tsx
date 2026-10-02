import { formatPounds } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

type Props = {
    recorded: number;
    planned: number;
}

export function RecordedPoundsLabel({ recorded, planned }: Props) {
    return (
        <p className="mt-1 font-mono text-xs tabular-nums text-ink-muted">
            {formatPounds(recorded)}
            <span className="text-ink-subtle">{planned > 0 ? ` / ${formatPounds(planned)} lbs` : ' lbs registradas'}</span>
        </p>
    )
}
