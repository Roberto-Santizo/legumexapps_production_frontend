import { ActionsMenu, formatNumber } from "@/features/shared/shared";
import { DeviationCell, formatPounds, hasTheoretical, type WeeklyPlanTaskPerformanceRecord } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { PencilIcon, Trash2Icon } from "lucide-react";

type Props = {
    record: WeeklyPlanTaskPerformanceRecord;
    editable: boolean;
    onEdit: (record: WeeklyPlanTaskPerformanceRecord) => void;
    onDelete: (record: WeeklyPlanTaskPerformanceRecord) => void;
}

export function PerformanceRecordRow({ record, editable, onEdit, onDelete }: Props) {
    return (
        <tr className="tbody-tr">
            <td className="px-5 py-3.5">
                {record.pallet_number !== null
                    ? <span className="font-mono text-sm font-semibold tabular-nums text-ink">#{record.pallet_number}</span>
                    : <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">Suelto</span>}
            </td>

            <td className="px-5 py-3.5 text-right font-mono text-sm tabular-nums text-ink-muted">
                {record.boxes !== null ? formatNumber(record.boxes) : '—'}
            </td>

            <td className="px-5 py-3.5 text-right font-mono text-sm tabular-nums text-ink">
                {formatPounds(record.weighed_pounds)}
            </td>

            <td className="px-5 py-3.5 text-right font-mono text-sm tabular-nums text-ink-muted">
                {hasTheoretical(record) ? formatPounds(record.theoretical_pounds) : '—'}
            </td>

            <td className="px-5 py-3.5">
                <DeviationCell difference={record.difference_pounds} theoretical={record.theoretical_pounds} />
            </td>

            <td className="px-5 py-3.5">
                <p className="truncate text-sm text-ink">{record.user_name}</p>
                <p className="font-mono text-[11px] tabular-nums text-ink-subtle">{record.created_at}</p>
            </td>

            {editable && (
                <td className="px-3 py-3.5 text-right">
                    <ActionsMenu
                        items={[
                            { label: "Editar", icon: <PencilIcon />, onClick: () => onEdit(record) },
                            { label: "Eliminar", icon: <Trash2Icon />, onClick: () => onDelete(record), danger: true },
                        ]}
                    />
                </td>
            )}
        </tr>
    )
}
