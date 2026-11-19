import { AnimatePresence, motion } from "framer-motion";
import { MoveIcon } from "lucide-react";
import { formatSelectionCount, HINT_TRANSITION, type BoardCard } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    cards: BoardCard[];
    isDragging: boolean;
    onCancel: () => void;
}

export function BoardSelectionHint({ cards, isDragging, onCancel }: Props) {
    const [first] = cards;
    const single = cards.length === 1;

    return (
        <div aria-live="polite" className="sticky top-2 z-20 min-h-0">
            <AnimatePresence>
                {first && !isDragging && (
                    <motion.div
                        key="selection-hint"
                        initial={{ opacity: 0, y: -8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.98 }}
                        transition={HINT_TRANSITION}
                        className="flex items-center justify-between gap-3 rounded-lg bg-ink px-4 py-2.5 text-surface shadow-lg"
                    >
                        <p className="flex min-w-0 items-center gap-2 text-sm">
                            <MoveIcon className="size-4 shrink-0 opacity-70" aria-hidden="true" />
                            <span className="truncate">
                                {single
                                    ? <>Moviendo a <span className="font-semibold">{first.name}</span>.</>
                                    : <span className="font-semibold">{formatSelectionCount(cards.length)}.</span>}
                                {' '}Toca un lugar libre o arrastra cualquiera de las tarjetas.
                            </span>
                        </p>

                        <button
                            type="button"
                            onClick={onCancel}
                            className="shrink-0 cursor-pointer rounded-md px-2.5 py-1 text-xs font-medium text-surface/80 transition-colors hover:bg-surface/10 hover:text-surface focus-visible:outline-2 focus-visible:outline-surface"
                        >
                            {single ? 'Cancelar' : 'Limpiar selección'}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
