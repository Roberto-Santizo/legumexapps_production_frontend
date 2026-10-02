import { formatDurationHours } from "@/features/weekly-plan-task-timeouts/weekly-plan-task-timeouts";

type Props = {
    count: number;
    closedHours: number;
    editable: boolean;
}

export function TimeoutsTotalsRow({ count, closedHours, editable }: Props) {
    return (
        <tr className="border-t border-line-strong bg-canvas/70">
            <td className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle" colSpan={3}>
                Total detenido · {count} {count === 1 ? 'tiempo muerto' : 'tiempos muertos'}
            </td>

            <td className="px-5 py-3.5 text-right font-mono text-sm font-semibold tabular-nums text-ink">
                {formatDurationHours(closedHours)}
            </td>

            <td colSpan={editable ? 2 : 1} />
        </tr>
    )
}
