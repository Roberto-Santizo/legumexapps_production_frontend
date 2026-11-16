import type { DragEvent, KeyboardEvent } from "react";
import { GripVerticalIcon, LoaderCircleIcon, XIcon } from "lucide-react";
import { EmployeePhoto } from "@/features/shared/shared";
import { formatPosition, type BoardCard } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    card: BoardCard;
    selected: boolean;
    readonly: boolean;
    pending: boolean;
    onDragStart: (event: DragEvent) => void;
    onDragEnd: () => void;
    onSelect: () => void;
    onRemove?: () => void;
}

const SELECT_KEYS = new Set(['Enter', ' ']);

export function BoardEmployeeCard({ card, selected, readonly, pending, onDragStart, onDragEnd, onSelect, onRemove }: Props) {
    const interactive = !readonly && !pending;

    const handleKeyDown = (event: KeyboardEvent) => {
        if (!SELECT_KEYS.has(event.key)) return;
        event.preventDefault();
        onSelect();
    };

    return (
        <li className={`group flex items-center rounded-lg border bg-surface transition-[border-color,box-shadow,opacity] motion-reduce:transition-none ${selected ? 'border-ink shadow-md ring-2 ring-ink/10' : 'border-line hover:border-line-strong hover:shadow-sm'} ${pending ? 'opacity-60' : ''}`}>
            <div
                role={interactive ? 'button' : undefined}
                tabIndex={interactive ? 0 : undefined}
                aria-pressed={interactive ? selected : undefined}
                aria-label={interactive ? `${card.name}. ${selected ? 'Seleccionado: elige un lugar libre' : 'Arrastra o selecciona para mover'}` : undefined}
                draggable={interactive}
                onDragStart={interactive ? onDragStart : undefined}
                onDragEnd={interactive ? onDragEnd : undefined}
                onClick={interactive ? onSelect : undefined}
                onKeyDown={interactive ? handleKeyDown : undefined}
                className={`flex min-w-0 flex-1 select-none items-center gap-2.5 rounded-lg py-1.5 pl-1 pr-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${interactive ? 'cursor-grab active:cursor-grabbing' : ''}`}
            >
                {interactive
                    ? <GripVerticalIcon className="size-3.5 shrink-0 text-line-strong transition-colors group-hover:text-ink-subtle" aria-hidden="true" />
                    : <span className="w-1 shrink-0" aria-hidden="true" />}

                <EmployeePhoto code={card.code} name={card.name} className="pointer-events-none aspect-[3/4] w-7 shrink-0 rounded border border-line" />

                <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-medium leading-tight text-ink">{card.name}</span>
                    <span className="mt-0.5 block truncate font-mono text-[10.5px] text-ink-subtle">{card.code} · {formatPosition(card.position)}</span>
                    {card.tag && <span className="mt-0.5 block truncate text-[11px] text-ink-muted">{card.tag}</span>}
                </span>

                {pending && <LoaderCircleIcon className="size-3.5 shrink-0 animate-spin text-ink-subtle motion-reduce:animate-none" aria-label="Guardando" />}
            </div>

            {onRemove && interactive && (
                <button
                    type="button"
                    onClick={onRemove}
                    aria-label={`Quitar a ${card.name} de la tarea`}
                    className="mr-1 shrink-0 cursor-pointer rounded-md p-1.5 text-ink-subtle opacity-60 transition hover:bg-canvas hover:text-ink hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-ink group-hover:opacity-100"
                >
                    <XIcon className="size-3.5" />
                </button>
            )}
        </li>
    )
}
