import { BarChartCard, CustomFilledButton, FadeInUp, formatNumber, getCurrentDate, getIsoWeekDates, Loading, parseDateValue, useNotification } from "@/features/shared/shared";
import { draftWeeklyPlanProvider } from "@/features/draft-weekly-plans/draft-weekly-plans";
import { DraftWeeklyPlanTasksSidebar } from "@/features/draft-weekly-plan-tasks/draft-weekly-plan-tasks";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";

const WEEK_DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

const monthFormatter = new Intl.DateTimeFormat('es-GT', { day: 'numeric', month: 'short' });

export function ShowDraftWeeklyPlan() {
    const { id } = useParams();
    const notification = useNotification();

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['getDraftWeeklyPlanById', id],
        queryFn: () => draftWeeklyPlanProvider.getDraftWeeklyPlanById(id!)
    });

    const { data: hoursPerLine } = useQuery({
        queryKey: ['getHoursPerLineByDraftWeeklyPlanId', id],
        queryFn: () => draftWeeklyPlanProvider.getHoursPerLineByDraftWeeklyPlanId(id!)
    });

    const { data: packingMaterialNecessity } = useQuery({
        queryKey: ['getPackingMaterialNecessityById', id],
        queryFn: () => draftWeeklyPlanProvider.getPackingMaterialNecessityById(id!)
    });

    const { data: rawMaterialNecessity } = useQuery({
        queryKey: ['getRawNecessityById', id],
        queryFn: () => draftWeeklyPlanProvider.getRawNecessityById(id!)
    });

    const { mutate, isPending } = useMutation({
        mutationFn: () => draftWeeklyPlanProvider.confirmDraftWeeklyPlan(id!),
        onSuccess: (message) => {
            notification.success(message);
            refetch();
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const handleConfirmPlan = () => {
        notification.question('¿Desea confirmar el plan?', 'Confirmar', 'Al confirmar el plan no se puede deshacer la acción', () => mutate());
    }

    if (isLoading) return <Loading />
    if (data && hoursPerLine && packingMaterialNecessity && rawMaterialNecessity) {
        const weekDates = getIsoWeekDates(data.week, data.year);
        const today = getCurrentDate();
        const firstDay = monthFormatter.format(parseDateValue(weekDates[0]));
        const lastDay = monthFormatter.format(parseDateValue(weekDates[6]));
        const totalHours = hoursPerLine.reduce((total, item) => total + Number(item.value), 0);
        const isConfirmed = !!data.confirmation_date;

        const summary = [
            { label: 'Horas planificadas', value: formatNumber(totalHours) },
            { label: 'Líneas con carga', value: formatNumber(hoursPerLine.filter(item => Number(item.value) > 0).length) },
        ];

        return (
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                <div className="min-w-0 flex-1 space-y-8">
                    <FadeInUp>
                        <header className="overflow-hidden rounded-2xl border border-line bg-surface">
                            <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">Plan semanal borrador</p>
                                        {isConfirmed ? (
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800 ring-1 ring-inset ring-emerald-200">
                                                <CheckCircle2 className="size-3.5" />
                                                Confirmado
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800 ring-1 ring-inset ring-amber-200">
                                                <span className="size-1.5 rounded-full bg-amber-500" />
                                                Pendiente de confirmar
                                            </span>
                                        )}
                                    </div>

                                    <h1 className="mt-3 flex items-baseline gap-3 text-ink">
                                        <span className="text-4xl font-semibold tracking-tight">Semana {data.week}</span>
                                        <span className="font-mono text-lg text-ink-subtle">{data.year}</span>
                                    </h1>

                                    <p className="mt-1 text-sm text-ink-muted">
                                        Del {firstDay} al {lastDay}
                                        {isConfirmed && <> · Confirmado el <span className="font-medium text-ink">{data.confirmation_date}</span></>}
                                    </p>
                                </div>

                                {!isConfirmed && (
                                    <CustomFilledButton
                                        label={isPending ? 'Confirmando...' : 'Confirmar plan'}
                                        type="button"
                                        icon={<CheckCircle2 className="size-4" />}
                                        disabled={isPending}
                                        onClick={handleConfirmPlan}
                                    />
                                )}
                            </div>

                            <ol className="grid grid-cols-7 border-t border-line bg-canvas/50">
                                {weekDates.map((date, index) => {
                                    const isToday = date === today;
                                    return (
                                        <li
                                            key={date}
                                            className={`flex flex-col items-center gap-1 border-line py-3 ${index > 0 ? 'border-l' : ''} ${isToday ? 'bg-surface' : ''}`}
                                        >
                                            <span className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${isToday ? 'text-ink' : 'text-ink-subtle'}`}>{WEEK_DAYS[index]}</span>
                                            <span className={`flex size-7 items-center justify-center rounded-full font-mono text-sm ${isToday ? 'bg-ink text-surface' : 'text-ink-muted'}`}>
                                                {parseDateValue(date).getDate()}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ol>
                        </header>
                    </FadeInUp>

                    <FadeInUp>
                        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-2">
                            {summary.map(item => (
                                <div key={item.label} className="bg-surface px-5 py-4">
                                    <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">{item.label}</dt>
                                    <dd className="mt-1.5 font-mono text-2xl text-ink">{item.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </FadeInUp>

                    <section className="space-y-3">
                        <h2 className="text-sm font-semibold text-ink">Capacidad de líneas</h2>
                        <FadeInUp>
                            <BarChartCard title="Horas por línea" data={hoursPerLine} excelColumns={[{ header: 'Línea', key: 'label' }, { header: 'Horas', key: 'value' }]} />
                        </FadeInUp>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-sm font-semibold text-ink">Necesidad de insumos</h2>
                        <div className="space-y-6">
                            <FadeInUp>
                                <BarChartCard title="Material de empaque" data={packingMaterialNecessity} excelColumns={[{ header: 'Item', key: 'label' }, { header: 'Cantidad', key: 'value' }]} />
                            </FadeInUp>

                            <FadeInUp>
                                <BarChartCard title="Materia prima" data={rawMaterialNecessity} excelColumns={[{ header: 'Item', key: 'label' }, { header: 'Cantidad', key: 'value' }]} />
                            </FadeInUp>
                        </div>
                    </section>
                </div>


                {!data.confirmation_date &&
                    <div className="lg:sticky lg:top-4">
                        <DraftWeeklyPlanTasksSidebar />
                    </div>
                }
            </div>
        )
    }
}
