import type { KeyboardEvent } from "react";
import { ActivityStation, BoardSelectionHint, formatOccupancy, getCardsAt, StaffListEmpty, StaffListError, StaffListLoading, UnassignedPool, useActivityBoard, type ActivitySlot, type BoardCard, type BoardTarget } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    slots: ActivitySlot[];
    cards: BoardCard[];
    isLoading: boolean;
    errorMessage?: string;
    description: string;
    poolTitle: string;
    poolDescription: string;
    showPool: boolean;
    allowUnassign?: boolean;
    readonly?: boolean;
    pendingKey?: string;
    onMove: (key: string, target: BoardTarget) => void;
    onRemove?: (key: string) => void;
}

export function StaffActivityBoard({ slots, cards, isLoading, errorMessage, description, poolTitle, poolDescription, showPool, allowUnassign = false, readonly = false, pendingKey, onMove, onRemove }: Props) {
    const board = useActivityBoard({ cards, onMove });
    const ready = !isLoading && !errorMessage;

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') board.clear();
    };

    return (
        <section className="space-y-3" onKeyDown={handleKeyDown}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <div>
                    <h3 className="text-sm font-semibold text-ink">Actividades de la línea</h3>
                    <p className="mt-0.5 text-xs text-ink-muted">{description}</p>
                </div>

                {ready && slots.length > 0 && <span className="font-mono text-xs text-ink-subtle">{formatOccupancy(cards, slots)}</span>}
            </div>

            <BoardSelectionHint card={board.activeCard} isDragging={board.isDragging} onCancel={board.clear} />

            {!ready && (
                <div className="overflow-hidden rounded-xl border border-line bg-surface">
                    {isLoading && <StaffListLoading />}
                    {errorMessage && <StaffListError message={errorMessage} />}
                </div>
            )}

            {ready && slots.length === 0 && (
                <div className="rounded-xl border border-line bg-surface">
                    <StaffListEmpty
                        title="La línea no tiene actividades"
                        description="Configura las actividades y sus lugares en el detalle de la línea para poder asignar personal."
                    />
                </div>
            )}

            {ready && slots.length > 0 && (
                <div className={showPool ? 'grid gap-3 lg:grid-cols-[17rem_minmax(0,1fr)] lg:items-start' : ''}>
                    {showPool && (
                        <UnassignedPool
                            cards={getCardsAt(cards, null)}
                            board={board}
                            title={poolTitle}
                            description={poolDescription}
                            allowUnassign={allowUnassign}
                            readonly={readonly}
                            pendingKey={pendingKey}
                            onRemove={onRemove}
                            className="lg:sticky lg:top-4"
                        />
                    )}

                    <ul className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
                        {slots.map((slot) => (
                            <ActivityStation
                                key={slot.id}
                                slot={slot}
                                cards={getCardsAt(cards, slot.id)}
                                board={board}
                                readonly={readonly}
                                pendingKey={pendingKey}
                                onRemove={onRemove}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </section>
    )
}
