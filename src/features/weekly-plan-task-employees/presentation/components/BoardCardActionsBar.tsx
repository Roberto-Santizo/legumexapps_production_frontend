import type { ReactNode } from "react";
import { ArrowLeftRightIcon, Undo2Icon, XIcon } from "lucide-react";

type Props = {
    name: string;
    replacing: boolean;
    onReplace?: () => void;
    onUndoReplace?: () => void;
    onRemove?: () => void;
}

const ACTION_CLASS = 'shrink-0 cursor-pointer rounded-md p-1.5 text-ink-subtle transition hover:bg-canvas hover:text-ink focus-visible:outline-2 focus-visible:outline-ink motion-reduce:transition-none';

function CardAction({ label, onClick, active = false, children }: { label: string; onClick: () => void; active?: boolean; children: ReactNode }) {
    return (
        <button type="button" onClick={onClick} aria-label={label} title={label} aria-pressed={active} className={`${ACTION_CLASS} ${active ? 'bg-canvas text-ink' : ''}`}>
            {children}
        </button>
    )
}

export function BoardCardActionsBar({ name, replacing, onReplace, onUndoReplace, onRemove }: Props) {
    if (!onReplace && !onUndoReplace && !onRemove) return null;

    return (
        <div className="mr-1 flex shrink-0 items-center opacity-70 transition-opacity focus-within:opacity-100 group-hover:opacity-100 motion-reduce:transition-none">
            {onUndoReplace && (
                <CardAction label={`Deshacer reemplazo de ${name}`} onClick={onUndoReplace}>
                    <Undo2Icon className="size-3.5" />
                </CardAction>
            )}

            {onReplace && (
                <CardAction label={`Reemplazar a ${name}`} onClick={onReplace} active={replacing}>
                    <ArrowLeftRightIcon className="size-3.5" />
                </CardAction>
            )}

            {onRemove && (
                <CardAction label={`Quitar a ${name} de la tarea`} onClick={onRemove}>
                    <XIcon className="size-3.5" />
                </CardAction>
            )}
        </div>
    )
}
