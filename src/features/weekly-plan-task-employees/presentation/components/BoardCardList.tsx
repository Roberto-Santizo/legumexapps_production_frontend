import { BoardEmployeeCard, type ActivityBoardControls, type BoardCard, type BoardCardActions } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    cards: BoardCard[];
    board: ActivityBoardControls;
    readonly: boolean;
    pendingKey?: string;
    actions: BoardCardActions;
}

export function BoardCardList({ cards, board, readonly, pendingKey, actions }: Props) {
    if (cards.length === 0) return null;

    return (
        <ul className="space-y-1.5">
            {cards.map((card) => (
                <BoardEmployeeCard
                    key={card.key}
                    card={card}
                    selected={board.activeCard?.key === card.key}
                    readonly={readonly}
                    pending={pendingKey === card.key}
                    actions={actions}
                    onDragStart={(event) => board.startDrag(event, card.key)}
                    onDragEnd={board.endDrag}
                    onSelect={() => board.toggleSelect(card.key)}
                />
            ))}
        </ul>
    )
}
