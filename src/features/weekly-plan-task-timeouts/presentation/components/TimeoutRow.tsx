import { ActionsMenu } from "@/features/shared/shared";
import { formatDurationHours, formatTimeoutDateTime, StoppedLineChronometer, type WeeklyPlanTaskTimeout } from "@/features/weekly-plan-task-timeouts/weekly-plan-task-timeouts";
import { PencilIcon, Trash2Icon } from "lucide-react";

type Props = {
    timeout: WeeklyPlanTaskTimeout;
    editable: boolean;
    onEdit: (timeout: WeeklyPlanTaskTimeout) => void;
    onDelete: (timeout: WeeklyPlanTaskTimeout) => void;
}

export function TimeoutRow({ timeout, editable, onEdit, onDelete }: Props) {
    return (
        <tr className={`tbody-tr ${timeout.is_open ? 'bg-[#a3402f]/4' : ''}`}>
            <td className="px-5 py-3.5">
                <p className="text-sm font-medium text-ink">{timeout.timeout_name}</p>
                {timeout.observation && (
                    <p className="mt-0.5 max-w-xs truncate text-xs text-ink-muted" title={timeout.observation}>{timeout.observation}</p>
                )}
            </td>

            <td className="px-5 py-3.5 font-mono text-sm tabular-nums text-ink-muted">
                {formatTimeoutDateTime(timeout.start_date)}
            </td>

            <td className="px-5 py-3.5 font-mono text-sm tabular-nums text-ink-muted">
                {timeout.end_date
                    ? formatTimeoutDateTime(timeout.end_date)
                    : <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#a3402f]">En curso</span>}
            </td>

            <td className="px-5 py-3.5 text-right">
                {timeout.duration_hours !== null
                    ? <span className="font-mono text-sm font-semibold tabular-nums text-ink">{formatDurationHours(timeout.duration_hours)}</span>
                    : <StoppedLineChronometer startDate={timeout.start_date} className="text-sm" />}
            </td>

            <td className="px-5 py-3.5">
                <p className="truncate text-sm text-ink">{timeout.user_name}</p>
            </td>

            {editable && (
                <td className="px-3 py-3.5 text-right">
                    <ActionsMenu
                        items={[
                            { label: "Editar", icon: <PencilIcon />, onClick: () => onEdit(timeout) },
                            { label: "Eliminar", icon: <Trash2Icon />, onClick: () => onDelete(timeout), danger: true },
                        ]}
                    />
                </td>
            )}
        </tr>
    )
}
