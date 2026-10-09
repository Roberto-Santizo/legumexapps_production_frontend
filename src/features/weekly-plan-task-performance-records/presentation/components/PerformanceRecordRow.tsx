import { ActionsMenu } from "@/features/shared/shared";
import { PerformanceRecordCell, type PerformanceRecordColumn, type WeeklyPlanTaskPerformanceRecord } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { PencilIcon, Trash2Icon } from "lucide-react";

type Props = {
    record: WeeklyPlanTaskPerformanceRecord;
    columns: PerformanceRecordColumn[];
    editable: boolean;
    onEdit: (record: WeeklyPlanTaskPerformanceRecord) => void;
    onDelete: (record: WeeklyPlanTaskPerformanceRecord) => void;
}

export function PerformanceRecordRow({ record, columns, editable, onEdit, onDelete }: Props) {
    return (
        <tr className="tbody-tr">
            {columns.map(column => (
                <PerformanceRecordCell key={column.key} column={column} record={record} />
            ))}

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
