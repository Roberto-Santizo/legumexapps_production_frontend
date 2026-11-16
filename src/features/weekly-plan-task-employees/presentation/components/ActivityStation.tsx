import { BoardCardList, BoardDropZone, canDropOnSlot, EmptyPlace, formatRemainingPlaces, getEmptyPlaces, type ActivityBoardControls, type ActivitySlot, type BoardCard, type BoardCardActions } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    slot: ActivitySlot;
    cards: BoardCard[];
    board: ActivityBoardControls;
    readonly: boolean;
    pendingKey?: string;
    actions: BoardCardActions;
}

export function ActivityStation({ slot, cards, board, readonly, pendingKey, actions }: Props) {
    const canDrop = !readonly && canDropOnSlot(slot, board.activeCard);
    const over = slot.remaining < 0;
    const { shown, hidden } = getEmptyPlaces(slot);
    const onPlace = canDrop && !board.isDragging ? () => board.place(slot.id) : undefined;

    return (
        <li>
            <BoardDropZone target={slot.id} canDrop={canDrop} board={board} alert={over} className="h-full bg-surface">
                <header className="flex items-start justify-between gap-3 border-b border-line px-3.5 py-3">
                    <div className="min-w-0">
                        <h4 className="truncate text-sm font-semibold tracking-wide text-ink">{slot.activity}</h4>
                        <p className="mt-0.5 font-mono text-[11px] text-ink-subtle">{slot.unit}</p>
                    </div>

                    <div className="shrink-0 text-right">
                        <p className={`font-mono text-sm tabular-nums ${over ? 'text-red-700' : 'text-ink'}`}>
                            {slot.used}<span className={over ? 'text-red-400' : 'text-ink-subtle'}>/{slot.quantity}</span>
                        </p>
                        <p className={`text-[11px] ${over ? 'font-medium text-red-700' : 'text-ink-muted'}`}>{formatRemainingPlaces(slot.remaining)}</p>
                    </div>
                </header>

                <div className="flex-1 space-y-1.5 p-2">
                    <BoardCardList cards={cards} board={board} readonly={readonly} pendingKey={pendingKey} actions={actions} />

                    {shown > 0 && (
                        <ul className="space-y-1.5">
                            {Array.from({ length: shown }, (_, index) => <EmptyPlace key={index} onPlace={onPlace} />)}
                        </ul>
                    )}

                    {hidden > 0 && (
                        <p className="px-1 pt-0.5 text-center font-mono text-[11px] text-ink-subtle">+{hidden} {hidden === 1 ? 'lugar libre' : 'lugares libres'}</p>
                    )}
                </div>
            </BoardDropZone>
        </li>
    )
}
