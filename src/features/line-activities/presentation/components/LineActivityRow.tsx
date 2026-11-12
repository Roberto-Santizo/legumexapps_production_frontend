import type { LineActivity } from "@/features/line-activities/line-activities";
import { PencilIcon, Trash2Icon } from "lucide-react";

type Props = {
    item: LineActivity;
    shade: string;
    busy: boolean;
    onEdit: () => void;
    onRemove: () => void;
}

const iconButton = "rounded-md p-1.5 text-ink-subtle transition-colors hover:bg-canvas hover:text-ink focus-visible:outline-2 focus-visible:outline-ink disabled:pointer-events-none disabled:opacity-30";

export function LineActivityRow({ item, shade, busy, onEdit, onRemove }: Props) {
    return (
        <li className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-canvas/60">
            <span className={`h-8 w-1.5 shrink-0 rounded-[2px] ${shade}`} aria-hidden="true" />

            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium tracking-wide text-ink">{item.activity}</p>
                <p className="mt-0.5 font-mono text-[11px] text-ink-subtle">{item.unit}</p>
            </div>

            <p className="shrink-0 text-right">
                <span className="font-mono text-xl tabular-nums text-ink">{item.quantity}</span>
                <span className="ml-1.5 text-xs text-ink-muted">{item.quantity === 1 ? 'persona' : 'personas'}</span>
            </p>

            <div className="flex shrink-0 items-center gap-0.5">
                <button type="button" className={iconButton} onClick={onEdit} disabled={busy} aria-label={`Cambiar cantidad de ${item.activity}`} title="Cambiar cantidad">
                    <PencilIcon className="size-4" />
                </button>
                <button type="button" className={`${iconButton} hover:text-red-600`} onClick={onRemove} disabled={busy} aria-label={`Quitar ${item.activity}`} title="Quitar de la línea">
                    <Trash2Icon className="size-4" />
                </button>
            </div>
        </li>
    )
}
