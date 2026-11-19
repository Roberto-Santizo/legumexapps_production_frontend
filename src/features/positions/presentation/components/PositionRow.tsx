import { ActionsMenu, StatusTag } from "@/features/shared/shared";
import { getPositionActivityLabel, type Position } from "@/features/positions/positions";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";

type Props = {
    position: Position;
    onShow: () => void;
    onEdit: () => void;
    onRemove: () => void;
}

export function PositionRow({ position, onShow, onEdit, onRemove }: Props) {
    return (
        <li className="relative flex items-center gap-4 px-5 py-3.5">
            <span
                className={`z-10 size-2.5 shrink-0 rounded-full ring-4 ring-surface ${position.status ? 'bg-[#4d6b2f]' : 'bg-line-strong'}`}
                aria-hidden="true"
            />

            <button
                type="button"
                onClick={onShow}
                className="group flex min-w-0 flex-1 cursor-pointer items-center gap-4 rounded-md text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
                <span className="w-24 shrink-0 truncate font-mono text-sm text-ink-muted transition-colors group-hover:text-ink">{position.code}</span>

                <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-ink group-hover:underline group-hover:underline-offset-4">{getPositionActivityLabel(position)}</span>
                    {position.unit && <span className="mt-0.5 block font-mono text-[11px] text-ink-subtle">{position.unit}</span>}
                </span>
            </button>

            <span className="hidden sm:inline-flex">
                <StatusTag flag={position.status} />
            </span>

            <ActionsMenu
                items={[
                    { label: "Ver detalles", icon: <EyeIcon />, onClick: onShow },
                    { label: "Editar", icon: <EditIcon />, onClick: onEdit },
                    { label: "Eliminar", icon: <Trash2Icon />, onClick: onRemove, danger: true },
                ]}
            />
        </li>
    )
}
