import { formatRemainingPlaces, getSlotFillPercent, type ActivitySlot } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    slot: ActivitySlot;
    className?: string;
}

export function SlotMeter({ slot, className = '' }: Props) {
    const over = slot.remaining < 0;

    return (
        <div className={`flex items-center gap-2.5 ${className}`}>
            <div className="h-1 w-28 shrink-0 overflow-hidden rounded-full bg-line" aria-hidden="true">
                <span
                    className={`block h-full rounded-full transition-[width] duration-300 ease-out motion-reduce:transition-none ${over ? 'bg-red-600' : 'bg-ink'}`}
                    style={{ width: `${getSlotFillPercent(slot)}%` }}
                />
            </div>
            <span className={`font-mono text-xs tabular-nums ${over ? 'text-red-700' : 'text-ink'}`}>{slot.used}/{slot.quantity}</span>
            <span className={`text-xs ${over ? 'font-medium text-red-700' : 'text-ink-muted'}`}>{formatRemainingPlaces(slot.remaining)}</span>
        </div>
    )
}
