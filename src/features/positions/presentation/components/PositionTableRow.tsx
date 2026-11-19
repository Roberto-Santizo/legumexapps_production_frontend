import { ActionsMenu, StatusTag } from "@/features/shared/shared";
import { getPositionActivityLabel, type Position } from "@/features/positions/positions";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";

type Props = {
    position: Position;
    onShow: () => void;
    onEdit: () => void;
    onRemove: () => void;
}

const cell = "border-b border-line px-5 py-3 align-middle";

export function PositionTableRow({ position, onShow, onEdit, onRemove }: Props) {
    return (
        <tr className="transition-colors hover:bg-canvas/60">
            <td className={cell}>
                <button type="button" onClick={onShow} className="cursor-pointer rounded-md font-mono text-ink hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                    {position.code}
                </button>
            </td>
            <td className={`${cell} text-ink`}>{getPositionActivityLabel(position)}</td>
            <td className={`${cell} font-mono text-xs text-ink-muted`}>{position.unit ?? '—'}</td>
            <td className={cell}><StatusTag flag={position.status} /></td>
            <td className={`${cell} w-12 text-right`}>
                <ActionsMenu
                    items={[
                        { label: "Ver detalles", icon: <EyeIcon />, onClick: onShow },
                        { label: "Editar", icon: <EditIcon />, onClick: onEdit },
                        { label: "Eliminar", icon: <Trash2Icon />, onClick: onRemove, danger: true },
                    ]}
                />
            </td>
        </tr>
    )
}
