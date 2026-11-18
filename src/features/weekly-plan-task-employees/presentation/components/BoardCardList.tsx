import { BoardEmployeeCard, type ActivityBoardControls, type BoardCard, type BoardCardActions } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    cards: BoardCard[];
    board: ActivityBoardControls;
    readonly: boolean;
    pendingKeys?: string[];
    actions: BoardCardActions;
    className?: string;
}

const NO_KEYS: string[] = [];

export function BoardCardList({ cards, board, readonly, pendingKeys = NO_KEYS, actions, className = 'space-y-1.5' }: Props) {
    if (cards.length === 0) return null;

    return (
        <ul className={className}>
            {cards.map((card) => (
                <BoardEmployeeCard
                    key={card.key}
                    card={card}
                    selected={board.isSelected(card.key)}
                    readonly={readonly}
                    pending={pendingKeys.includes(card.key)}
                    actions={actions}
                    onDragStart={(event) => board.startDrag(event, card.key)}
                    onDragEnd={board.endDrag}
                    onSelect={() => board.toggleSelect(card.key)}
                />
            ))}
        </ul>
    )
}
