import { MoveIcon } from "lucide-react";
import type { BoardCard } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    card?: BoardCard;
    isDragging: boolean;
    onCancel: () => void;
}

export function BoardSelectionHint({ card, isDragging, onCancel }: Props) {
    return (
        <div aria-live="polite" className="min-h-0">
            {card && !isDragging && (
                <div className="flex items-center justify-between gap-3 rounded-lg bg-ink px-4 py-2.5 text-surface">
                    <p className="flex min-w-0 items-center gap-2 text-sm">
                        <MoveIcon className="size-4 shrink-0 opacity-70" aria-hidden="true" />
                        <span className="truncate">Moviendo a <span className="font-semibold">{card.name}</span>. Toca un lugar libre.</span>
                    </p>

                    <button
                        type="button"
                        onClick={onCancel}
                        className="shrink-0 cursor-pointer rounded-md px-2.5 py-1 text-xs font-medium text-surface/80 transition-colors hover:bg-surface/10 hover:text-surface focus-visible:outline-2 focus-visible:outline-surface"
                    >
                        Cancelar
                    </button>
                </div>
            )}
        </div>
    )
}
