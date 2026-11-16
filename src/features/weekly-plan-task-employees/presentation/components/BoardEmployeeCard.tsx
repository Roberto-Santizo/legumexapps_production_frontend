import { useState, type DragEvent, type KeyboardEvent } from "react";
import { CheckIcon, GripVerticalIcon, LoaderCircleIcon } from "lucide-react";
import { EmployeePhoto } from "@/features/shared/shared";
import { BoardCardActionsBar, BoardCardReplaceField, formatPosition, type BoardCard, type BoardCardActions } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    card: BoardCard;
    selected: boolean;
    readonly: boolean;
    pending: boolean;
    actions: BoardCardActions;
    onDragStart: (event: DragEvent) => void;
    onDragEnd: () => void;
    onSelect: () => void;
}

const SELECT_KEYS = new Set(['Enter', ' ']);

export function BoardEmployeeCard({ card, selected, readonly, pending, actions, onDragStart, onDragEnd, onSelect }: Props) {
    const [replacing, setReplacing] = useState(false);
    const editable = !readonly && !pending;
    const interactive = editable && !replacing;
    const { onRemove, onReplace, onUndoReplace, getReplacementOptions, isLoadingOptions = false } = actions;

    const handleKeyDown = (event: KeyboardEvent) => {
        if (!SELECT_KEYS.has(event.key)) return;
        event.preventDefault();
        onSelect();
    };

    const handlePick = (employeeId: string) => {
        setReplacing(false);
        onReplace?.(card.key, employeeId);
    };

    return (
        <li className={`group overflow-hidden rounded-lg border bg-surface transition-[border-color,box-shadow,opacity] motion-reduce:transition-none ${selected || replacing ? 'border-ink shadow-md ring-2 ring-ink/10' : 'border-line hover:border-line-strong hover:shadow-sm'} ${pending ? 'opacity-60' : ''}`}>
            <div className="flex items-center">
                <div
                    role={interactive ? 'button' : undefined}
                    tabIndex={interactive ? 0 : undefined}
                    aria-pressed={interactive ? selected : undefined}
                    aria-label={interactive ? `${card.name}. ${selected ? 'Seleccionado' : 'Arrastra o selecciona para mover'}` : undefined}
                    draggable={interactive}
                    onDragStart={interactive ? onDragStart : undefined}
                    onDragEnd={interactive ? onDragEnd : undefined}
                    onClick={interactive ? onSelect : undefined}
                    onKeyDown={interactive ? handleKeyDown : undefined}
                    className={`flex min-w-0 flex-1 select-none items-center gap-3 rounded-lg py-2 pl-1.5 pr-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${interactive ? 'cursor-grab active:cursor-grabbing' : ''}`}
                >
                    {interactive && selected && (
                        <span className="flex size-4 shrink-0 items-center justify-center rounded bg-ink text-surface" aria-hidden="true">
                            <CheckIcon className="size-3" strokeWidth={3} />
                        </span>
                    )}

                    {interactive && !selected && <GripVerticalIcon className="size-4 shrink-0 text-line-strong transition-colors group-hover:text-ink-subtle" aria-hidden="true" />}

                    {!interactive && <span className="w-4 shrink-0" aria-hidden="true" />}

                    <EmployeePhoto code={card.code} name={card.name} className="pointer-events-none aspect-[3/4] w-14 shrink-0 rounded-md border border-line" />

                    <span className="min-w-0 flex-1">
                        <span className="line-clamp-2 text-sm font-semibold leading-snug text-ink">{card.name}</span>
                        <span className="mt-1 flex flex-wrap items-center gap-1.5">
                            <span className="font-mono text-xs tracking-wide text-ink-muted">{card.code}</span>
                            <span className="rounded border border-line bg-canvas px-1.5 py-px font-mono text-[10.5px] tracking-wide text-ink-muted">{formatPosition(card.position)}</span>
                        </span>
                        {card.tag && <span className="mt-1 block truncate text-xs text-ink-muted">{card.tag}</span>}
                    </span>

                    {pending && <LoaderCircleIcon className="size-3.5 shrink-0 animate-spin text-ink-subtle motion-reduce:animate-none" aria-label="Guardando" />}
                </div>

                {editable && (
                    <BoardCardActionsBar
                        name={card.name}
                        replacing={replacing}
                        onReplace={onReplace && (() => setReplacing((prev) => !prev))}
                        onUndoReplace={onUndoReplace && card.replaced ? () => onUndoReplace(card.key) : undefined}
                        onRemove={onRemove && (() => onRemove(card.key))}
                    />
                )}
            </div>

            {replacing && (
                <BoardCardReplaceField
                    name={card.name}
                    options={getReplacementOptions?.(card.key) ?? []}
                    isLoading={isLoadingOptions}
                    onPick={handlePick}
                    onCancel={() => setReplacing(false)}
                />
            )}
        </li>
    )
}
