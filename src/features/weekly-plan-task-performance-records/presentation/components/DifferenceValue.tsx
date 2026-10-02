import { DIFFERENCE_TONE_TEXT, formatSignedPounds, getDifferenceTone } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

type Props = {
    difference: number | null;
    className?: string;
}

export function DifferenceValue({ difference, className = '' }: Props) {
    if (difference === null) return <span className={`font-mono text-ink-subtle ${className}`}>—</span>;

    return (
        <span className={`font-mono tabular-nums ${DIFFERENCE_TONE_TEXT[getDifferenceTone(difference)]} ${className}`}>
            {formatSignedPounds(difference)}
        </span>
    )
}
