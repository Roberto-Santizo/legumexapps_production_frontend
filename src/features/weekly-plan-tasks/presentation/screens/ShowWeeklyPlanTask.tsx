import { ErrorComponent, formatNumber, Loading, TimelineStep } from "@/features/shared/shared";
import { ModalCreateWeeklyPlanTaskObservation, WeeklyPlanTaskObservationsPanel } from "@/features/weekly-plan-task-observations/weekly-plan-task-observations";
import { ProductionMeter, WeeklyPlanTaskHeader, weeklyPlanTaskProvider } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function ShowWeeklyPlanTask() {
    const { id } = useParams();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['getWeeklyPlanTaskById', id],
        queryFn: () => weeklyPlanTaskProvider.getWeeklyPlanTaskById(id!),
        retry: false
    });


    if (isLoading) return <Loading />
    if (isError) return <ErrorComponent message={error.message} />
    if (data) return (
        <div className="space-y-6">
            <WeeklyPlanTaskHeader task={data} />

            <section className="space-y-3">
                <h2 className="text-sm font-semibold text-ink">Avance de producción</h2>

                <div className="grid grid-cols-1 divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                    <ProductionMeter label="Cajas" unit="cajas" produced={data.produced_boxes} planned={data.boxes} />
                    <ProductionMeter label="Pallets" unit="pallets" produced={data.produced_pallets} planned={data.pallets} />
                </div>

                <div className="grid grid-cols-1 divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                    <div className="flex items-baseline justify-between gap-3 px-5 py-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">Horas</p>
                        <p className="font-mono text-lg text-ink">{data.hours}</p>
                    </div>

                    <div className="flex items-baseline justify-between gap-3 px-5 py-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">Libras pesadas</p>
                        <p className={`font-mono text-lg ${data.weighed_pounds !== null ? 'text-ink' : 'text-ink-subtle'}`}>
                            {data.weighed_pounds !== null ? formatNumber(data.weighed_pounds) : 'Sin registrar'}
                        </p>
                    </div>
                </div>
            </section>

            <section className="space-y-3">
                <h2 className="text-sm font-semibold text-ink">Ejecución</h2>

                <div className="overflow-hidden rounded-xl border border-line bg-surface">
                    <div className="flex flex-col divide-y divide-line sm:flex-row sm:divide-x sm:divide-y-0">
                        <TimelineStep label="Programada" date={data.operation_date_string} />
                        <TimelineStep label="Inicio" date={data.start_date} />
                        <TimelineStep label="Fin" date={data.end_date} />
                    </div>
                </div>
            </section>

            <WeeklyPlanTaskObservationsPanel weeklyPlanTaskId={id!} />

            <ModalCreateWeeklyPlanTaskObservation />
        </div>
    )
}
