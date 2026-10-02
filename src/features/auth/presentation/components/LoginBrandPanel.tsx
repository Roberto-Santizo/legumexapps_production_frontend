import { formatLongDate, getIsoWeek, getProductionWeekDays, LoginWeekStrip } from "@/features/auth/auth";

type Props = {
    today: Date;
};

export function LoginBrandPanel({ today }: Props) {
    const { week, year } = getIsoWeek(today);
    const days = getProductionWeekDays(today);

    return (
        <aside className="relative flex flex-col justify-between gap-10 overflow-hidden bg-ink px-6 py-8 text-canvas sm:px-10 lg:py-12">
            <div className="flex items-center justify-between gap-4">
                <p className="text-lg font-semibold tracking-tight">Legumex</p>
                <span className="rounded-full border border-canvas/20 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-canvas/70">
                    Producción
                </span>
            </div>

            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <p className="text-sm text-canvas/60">{formatLongDate(today)}</p>
                    <p className="flex items-baseline gap-3 font-mono tabular-nums leading-none">
                        <span className="text-xs uppercase tracking-[0.2em] text-canvas/50">Semana</span>
                        <span className="text-7xl font-semibold tracking-tighter sm:text-8xl lg:text-[9rem]">
                            {`${week}`.padStart(2, '0')}
                        </span>
                        <span className="text-sm text-canvas/40">{year}</span>
                    </p>
                </div>
                <div className="hidden max-w-sm sm:block">
                    <LoginWeekStrip days={days} />
                </div>
            </div>

            <p className="hidden max-w-xs text-sm leading-relaxed text-canvas/50 lg:block">
                Sistema interno de planta. El acceso está limitado al personal con usuario asignado.
            </p>
        </aside>
    );
}
