import { formatRemainingPlaces, getSlotMarks, type ActivitySlot, type SlotMark } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    slot: ActivitySlot;
}

const MARK_CLASS: Record<SlotMark, string> = {
    filled: 'border-ink bg-ink',
    empty: 'border-line-strong bg-transparent',
    over: 'border-red-500 bg-red-500',
};

export function ActivitySlotRow({ slot }: Props) {
    const over = slot.remaining < 0;

    return (
        <li className="flex flex-col gap-2.5 px-5 py-3.5 sm:flex-row sm:items-center sm:gap-6">
            <div className="min-w-0 sm:w-52 sm:shrink-0">
                <p className="truncate text-sm font-medium tracking-wide text-ink">{slot.activity}</p>
                <p className="mt-0.5 font-mono text-[11px] text-ink-subtle">{slot.unit}</p>
            </div>

            <div className="flex min-w-0 flex-1 flex-wrap gap-1" aria-hidden="true">
                {getSlotMarks(slot).map((mark, index) => (
                    <span key={index} className={`size-2.5 rounded-[2px] border transition-colors motion-reduce:transition-none ${MARK_CLASS[mark]}`} />
                ))}
            </div>

            <p className="flex shrink-0 items-baseline gap-2 sm:justify-end">
                <span className="font-mono text-base tabular-nums text-ink">
                    {slot.used}<span className="text-ink-subtle">/{slot.quantity}</span>
                </span>
                <span className={`w-28 text-xs sm:text-right ${over ? 'font-medium text-red-700' : 'text-ink-muted'}`}>
                    {formatRemainingPlaces(slot.remaining)}
                </span>
            </p>
        </li>
    )
}
