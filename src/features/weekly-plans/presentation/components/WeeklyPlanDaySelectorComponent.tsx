import { getCurrentDate, parseDateValue } from "@/features/shared/shared";
import { motion, useReducedMotion } from "framer-motion";

const WEEK_DAY_LABELS = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'];

type Props = {
    dates: string[];
    selectedDate: string;
    onSelectDate: (date: string) => void;
}

export function WeeklyPlanDaySelectorComponent({ dates, selectedDate, onSelectDate }: Props) {
    const reduceMotion = useReducedMotion();
    const today = getCurrentDate();

    return (
        <div
            role="group"
            aria-label="Días de la semana"
            className="overflow-hidden rounded-2xl border border-line bg-surface"
        >
            <div className="flex w-full min-w-[560px] divide-x divide-line overflow-x-auto">
                {dates.map((date, index) => {
                    const day = parseDateValue(date);
                    const isSelected = date === selectedDate;
                    const isToday = date === today;

                    return (
                        <button
                            key={date}
                            type="button"
                            onClick={() => onSelectDate(date)}
                            aria-pressed={isSelected}
                            aria-label={`${WEEK_DAY_LABELS[index]} ${day.getDate()}`}
                            className="relative flex-1 px-4 py-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink/25"
                        >
                            {isSelected && (
                                <motion.span
                                    layoutId="weekly-plan-selected-day"
                                    aria-hidden="true"
                                    className="absolute inset-0 bg-ink"
                                    transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 38 }}
                                />
                            )}

                            <span className={`relative block font-mono text-[10px] uppercase tracking-[0.22em] ${isSelected ? 'text-canvas/70' : 'text-ink-subtle'}`}>
                                {WEEK_DAY_LABELS[index]}
                            </span>

                            <span className={`relative mt-2 block text-2xl font-semibold leading-none tabular-nums ${isSelected ? 'text-canvas' : 'text-ink'}`}>
                                {`${day.getDate()}`.padStart(2, '0')}
                            </span>

                            <span
                                aria-hidden="true"
                                className={`relative mx-auto mt-2 block size-1 rounded-full ${isToday ? (isSelected ? 'bg-canvas' : 'bg-ink') : 'bg-transparent'}`}
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
