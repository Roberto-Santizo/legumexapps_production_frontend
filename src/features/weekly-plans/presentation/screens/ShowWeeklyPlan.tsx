import { getCurrentDate, getIsoWeekDates, Loading, parseDateValue, Title } from "@/features/shared/shared";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { WeeklyPlanDaySelectorComponent, WeeklyPlanLineSummaryCardComponent, weeklyPlanProvider } from "@/features/weekly-plans/weekly-plans";

const MONTH_LABELS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

const formatWeekRange = (dates: string[]): string => {
    const start = parseDateValue(dates[0]);
    const end = parseDateValue(dates[dates.length - 1]);

    return `${start.getDate()} ${MONTH_LABELS[start.getMonth()]} – ${end.getDate()} ${MONTH_LABELS[end.getMonth()]} ${end.getFullYear()}`;
}

export function ShowWeeklyPlan() {
    const { id } = useParams();
    const [selectedDate, setSelectedDate] = useState(getCurrentDate());
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ['getWeeklyPlanById', id],
        queryFn: () => weeklyPlanProvider.getWeeklyPlanById(id!)
    });

    const weekDates = data ? getIsoWeekDates(data.week, data.year) : [];
    const activeDate = weekDates.includes(selectedDate) ? selectedDate : (weekDates[0] ?? selectedDate);

    const { data: summary, isLoading: isSummaryLoading } = useQuery({
        queryKey: ['getWeeklyPlanSummaryByDate', id, activeDate],
        queryFn: () => weeklyPlanProvider.getWeeklyPlanSummaryByDate(id!, activeDate),
        enabled: !!data
    });

    const dayTotal = summary?.reduce((total, line) => total + line.total_tasks, 0) ?? 0;

    const handleClickOnItem = (code: string) => {
        navigate(`/planes-semanales/tareas/${code}/${activeDate}`)
    }

    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <Title
                    title="Plan Semanal"
                    subtitle={`Semana ${data.week} · ${formatWeekRange(weekDates)}`}
                />
            </div>

            <WeeklyPlanDaySelectorComponent
                dates={weekDates}
                selectedDate={activeDate}
                onSelectDate={setSelectedDate}
            />

            <section className="space-y-4">
                <div className="flex items-end justify-between gap-4 border-b border-line pb-3">
                    <h2 className="text-sm font-semibold text-ink">
                        Resumen por línea
                    </h2>

                    <div className="text-right">
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-subtle">
                            Tareas del día
                        </p>

                        <p className="mt-1 text-2xl font-semibold leading-none tabular-nums text-ink">
                            {dayTotal}
                        </p>
                    </div>
                </div>

                {isSummaryLoading && <Loading label="Cargando resumen" />}

                {summary && summary.length > 0 && (
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {summary.map((line) => (
                            <WeeklyPlanLineSummaryCardComponent
                                key={line.line_id}
                                summary={line}
                                dayTotal={dayTotal}
                                onClick={() => handleClickOnItem(line.line_code)}
                            />
                        ))}
                    </div>
                )}

                {summary && summary.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-line-strong bg-surface p-10 text-center">
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-subtle">
                            Sin tareas
                        </p>

                        <p className="mt-3 text-sm text-ink-muted">
                            Este día no tiene tareas programadas. Elige otro día de la semana o crea tareas desde el calendario.
                        </p>
                    </div>
                )}
            </section>
        </div>
    )
}
