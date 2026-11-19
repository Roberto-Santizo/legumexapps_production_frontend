import { CheckCheckIcon } from "lucide-react";
import type { ActivityBoardControls, BoardCard } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    cards: BoardCard[];
    board: ActivityBoardControls;
}

export function PoolSelectAll({ cards, board }: Props) {
    if (cards.length < 2) return null;

    const keys = cards.map((card) => card.key);
    const allSelected = keys.every(board.isSelected);

    return (
        <div className="flex items-center justify-between gap-2 border-b border-line px-3.5 py-2">
            <span className="text-[11px] text-ink-subtle">Toca varias tarjetas para moverlas juntas</span>

            <button
                type="button"
                onClick={() => (allSelected ? board.unselectMany(keys) : board.selectMany(keys))}
                className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium text-ink-muted transition-colors hover:bg-surface hover:text-ink focus-visible:outline-2 focus-visible:outline-ink"
            >
                <CheckCheckIcon className="size-3.5" aria-hidden="true" />
                {allSelected ? 'Quitar selección' : `Seleccionar ${cards.length}`}
            </button>
        </div>
    )
}
