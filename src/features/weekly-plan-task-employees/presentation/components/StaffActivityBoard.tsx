import type { KeyboardEvent, ReactNode } from "react";
import { FadeSwitch } from "@/features/shared/shared";
import { ActivityStation, BoardSelectionHint, formatOccupancy, getBoardView, getCardsAt, StaffListEmpty, StaffListError, StaffListLoading, UnassignedPool, useActivityBoard, type ActivitySlot, type BoardCard, type BoardCardActions, type BoardTarget, type StationAddConfig } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

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
    pendingKeys?: string[];
    onMove: (keys: string[], target: BoardTarget) => void;
    actions?: BoardCardActions;
    addEmployee?: StationAddConfig;
    poolFooter?: ReactNode;
}

const NO_ACTIONS: BoardCardActions = {};

export function StaffActivityBoard({ slots, cards, isLoading, errorMessage, description, poolTitle, poolDescription, showPool, allowUnassign = false, readonly = false, pendingKeys, onMove, actions = NO_ACTIONS, addEmployee, poolFooter }: Props) {
    const board = useActivityBoard({ cards, onMove });
    const view = getBoardView(isLoading, errorMessage, slots.length, showPool);
    const ready = view === 'board' || view === 'board-pool';

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

            <BoardSelectionHint cards={board.selectedCards} isDragging={board.isDragging} onCancel={board.clear} />

            <FadeSwitch switchKey={view}>
                {(view === 'loading' || view === 'error') && (
                    <div className="overflow-hidden rounded-xl border border-line bg-surface">
                        {view === 'loading' && <StaffListLoading />}
                        {view === 'error' && <StaffListError message={errorMessage ?? ''} />}
                    </div>
                )}

                {view === 'empty' && (
                    <div className="rounded-xl border border-line bg-surface">
                        <StaffListEmpty
                            title="La línea no tiene actividades"
                            description="Configura las actividades y sus lugares en el detalle de la línea para poder asignar personal."
                        />
                    </div>
                )}

                {ready && slots.length > 0 && (
                    <div className={showPool ? 'grid gap-3 lg:grid-cols-[21rem_minmax(0,1fr)] xl:grid-cols-[24rem_minmax(0,1fr)] lg:items-start' : ''}>
                        {showPool && (
                            <UnassignedPool
                                cards={getCardsAt(cards, null)}
                                board={board}
                                title={poolTitle}
                                description={poolDescription}
                                allowUnassign={allowUnassign}
                                readonly={readonly}
                                pendingKeys={pendingKeys}
                                actions={actions}
                                footer={poolFooter}
                                className="lg:sticky lg:top-4"
                            />
                        )}

                        <ul className="space-y-2">
                            {slots.map((slot) => (
                                <ActivityStation
                                    key={slot.id}
                                    slot={slot}
                                    cards={getCardsAt(cards, slot.id)}
                                    board={board}
                                    readonly={readonly}
                                    pendingKeys={pendingKeys}
                                    actions={actions}
                                    addEmployee={addEmployee}
                                />
                            ))}
                        </ul>
                    </div>
                )}
            </FadeSwitch>
        </section>
    )
}
