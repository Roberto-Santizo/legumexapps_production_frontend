import type { ProductionWeekDay } from "@/features/auth/auth";

type Props = {
    days: ProductionWeekDay[];
};

export function LoginWeekStrip({ days }: Props) {
    return (
        <ol className="grid grid-cols-7 gap-1.5">
            {days.map((day) => (
                <li
                    key={day.date}
                    aria-current={day.isToday ? 'date' : undefined}
                    className={`flex flex-col items-center gap-1 rounded-md py-2 font-mono text-xs tabular-nums transition-colors ${day.isToday ? 'bg-canvas text-ink' : 'text-canvas/45'}`}
                >
                    <span className={day.isToday ? 'text-ink-muted' : ''}>{day.initial}</span>
                    <span className="text-sm font-semibold">{day.dayNumber}</span>
                </li>
            ))}
        </ol>
    );
}
