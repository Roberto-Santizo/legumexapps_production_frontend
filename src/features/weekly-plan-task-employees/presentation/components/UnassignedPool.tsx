import { useState, type ReactNode } from "react";
import { CheckCircle2Icon } from "lucide-react";
import { BoardCardList, BoardDropZone, canDropOnPool, EmptyPlace, filterBoardCards, PoolSearchField, PoolSelectAll, type ActivityBoardControls, type BoardCard, type BoardCardActions } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    cards: BoardCard[];
    board: ActivityBoardControls;
    title: string;
    description: string;
    allowUnassign: boolean;
    readonly: boolean;
    pendingKeys?: string[];
    actions: BoardCardActions;
    footer?: ReactNode;
    className?: string;
}

export function UnassignedPool({ cards, board, title, description, allowUnassign, readonly, pendingKeys, actions, footer, className = '' }: Props) {
    const canDrop = !readonly && canDropOnPool(allowUnassign, board.movingCards);
    const [query, setQuery] = useState('');
    const count = cards.length;
    const visible = filterBoardCards(cards, query);

    return (
        <BoardDropZone target={null} canDrop={canDrop} board={board} className={`bg-canvas/50 ${className}`}>
            <header className="border-b border-line px-3.5 py-3">
                <div className="flex items-center justify-between gap-3">
                    <h4 className="text-sm font-semibold text-ink">{title}</h4>
                    <span className={`rounded-full px-2 py-0.5 font-mono text-[11px] tabular-nums ${count > 0 ? 'bg-ink text-surface' : 'bg-line text-ink-muted'}`}>{count}</span>
                </div>
                <p className="mt-1 text-xs text-ink-muted">{description}</p>
            </header>

            {count > 0 && <PoolSearchField value={query} onChange={setQuery} total={count} matches={visible.length} />}

            {!readonly && <PoolSelectAll cards={visible} board={board} />}

            <div className="space-y-1.5 overflow-y-auto overscroll-contain p-2 lg:max-h-[calc(100vh-14rem)]">
                {canDrop && !board.isDragging && (
                    <ul><EmptyPlace onPlace={() => board.place(null)} placeLabel="Dejar sin actividad" /></ul>
                )}

                <BoardCardList cards={visible} board={board} readonly={readonly} pendingKeys={pendingKeys} actions={actions} />

                {count > 0 && visible.length === 0 && (
                    <p className="px-3 py-6 text-center text-xs text-ink-muted">Nadie por asignar coincide con «{query.trim()}».</p>
                )}

                {count === 0 && (
                    <p className="flex flex-col items-center gap-1.5 px-3 py-6 text-center text-xs text-ink-muted">
                        <CheckCircle2Icon className="size-5 text-ink-subtle" aria-hidden="true" />
                        Todos tienen actividad
                    </p>
                )}
            </div>

            {footer}
        </BoardDropZone>
    )
}
