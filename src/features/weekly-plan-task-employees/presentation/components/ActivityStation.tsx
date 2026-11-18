import { Collapse } from "@/features/shared/shared";
import { BoardCardList, BoardDropZone, canDropOnSlot, getMissingPlaces, SlotMeter, StationAddEmployee, StationPlaceButton, type ActivityBoardControls, type ActivitySlot, type BoardCard, type BoardCardActions, type StationAddConfig } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    slot: ActivitySlot;
    cards: BoardCard[];
    board: ActivityBoardControls;
    readonly: boolean;
    pendingKeys?: string[];
    actions: BoardCardActions;
    addEmployee?: StationAddConfig;
}

export function ActivityStation({ slot, cards, board, readonly, pendingKeys, actions, addEmployee }: Props) {
    const canDrop = !readonly && canDropOnSlot(slot, board.movingCards);
    const missing = readonly ? 0 : getMissingPlaces(slot, board.movingCards);
    const over = slot.remaining < 0;

    return (
        <li>
            <BoardDropZone target={slot.id} canDrop={canDrop} board={board} alert={over} className="bg-surface">
                <header className="flex flex-wrap items-center gap-x-4 gap-y-2 px-3.5 py-3">
                    <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-2">
                            <h4 className="truncate text-sm font-semibold text-ink">{slot.activity}</h4>
                            <span className="font-mono text-[11px] text-ink-subtle">{slot.unit}</span>
                        </div>
                        <SlotMeter slot={slot} className="mt-2" />
                    </div>

                    {!board.isDragging && <StationPlaceButton canPlace={canDrop} missing={missing} onPlace={() => board.place(slot.id)} />}
                </header>

                <Collapse show={!readonly && slot.remaining > 0}>
                    {addEmployee && (
                        <div className="border-t border-line">
                            <StationAddEmployee {...addEmployee} activityId={slot.id} activity={slot.activity} />
                        </div>
                    )}
                </Collapse>

                {cards.length > 0 && (
                    <div className="border-t border-line p-2">
                        <BoardCardList
                            cards={cards}
                            board={board}
                            readonly={readonly}
                            pendingKeys={pendingKeys}
                            actions={actions}
                            className="grid gap-1.5 xl:grid-cols-2"
                        />
                    </div>
                )}
            </BoardDropZone>
        </li>
    )
}
