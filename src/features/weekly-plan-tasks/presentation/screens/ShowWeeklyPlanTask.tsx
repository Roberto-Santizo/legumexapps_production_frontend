import { ErrorComponent, Loading, Title } from "@/features/shared/shared";
import { ModalCreateWeeklyPlanTaskObservation, WeeklyPlanTaskObservationsPanel } from "@/features/weekly-plan-task-observations/weekly-plan-task-observations";
import { weeklyPlanTaskProvider } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

const formatDate = (value: string | null) => {
    if (!value) return null;

    const [year, month, day] = value.slice(0, 10).split('-');
    if (!year || !month || !day) return value;

    return `${day} ${MONTHS[Number(month) - 1] ?? ''} ${year}`;
}

const formatNumber = (value: number | null) => (value ?? 0).toLocaleString('es-GT');

type MeterProps = {
    label: string;
    unit: string;
    produced: number | null;
    planned: number;
}

function ProductionMeter({ label, unit, produced, planned }: MeterProps) {
    const done = produced ?? 0;
    const ratio = planned > 0 ? done / planned : 0;
    const percent = Math.round(ratio * 100);
    const complete = done >= planned && planned > 0;
    const pending = Math.max(planned - done, 0);

    return (
        <div className="p-5">
            <div className="flex items-baseline justify-between gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">{label}</p>
                <p className={`font-mono text-xs ${complete ? 'text-[#4d6b2f]' : 'text-ink-muted'}`}>{percent}%</p>
            </div>

            <p className="mt-2 font-mono text-3xl tracking-tight text-ink">
                {formatNumber(done)}
                <span className="text-lg text-ink-subtle"> / {formatNumber(planned)}</span>
            </p>

            <div
                className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-canvas"
                role="progressbar"
                aria-label={label}
                aria-valuenow={percent}
                aria-valuemin={0}
                aria-valuemax={100}
            >
                <div
                    className={`h-full rounded-full transition-[width] duration-500 ease-out motion-reduce:transition-none ${complete ? 'bg-[#4d6b2f]' : 'bg-ink'}`}
                    style={{ width: `${Math.min(ratio, 1) * 100}%` }}
                />
            </div>

            <p className="mt-2 text-xs text-ink-muted">
                {complete ? 'Meta alcanzada' : `Faltan ${formatNumber(pending)} ${unit}`}
            </p>
        </div>
    )
}

type StepProps = {
    label: string;
    date: string | null;
}

function TimelineStep({ label, date }: StepProps) {
    const value = formatDate(date);

    return (
        <div className="flex flex-1 items-start gap-3 p-5">
            <span
                className={`mt-1 size-2.5 shrink-0 rounded-full ring-4 ring-surface ${value ? 'bg-ink' : 'border border-line-strong bg-surface'}`}
                aria-hidden="true"
            />

            <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">{label}</p>
                <p className={`mt-1.5 text-sm ${value ? 'font-medium text-ink' : 'text-ink-subtle'}`}>{value ?? 'Sin registrar'}</p>
            </div>
        </div>
    )
}

export function ShowWeeklyPlanTask() {
    const { id } = useParams();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['getWeeklyPlanTaskById', id],
        queryFn: () => weeklyPlanTaskProvider.getWeeklyPlanTaskById(id!),
        retry: false
    });


    if (isLoading) return <Loading />
    if (isError) return <ErrorComponent message={error.message} />
    if (data) {
        const complete = (data.produced_boxes ?? 0) >= data.boxes && data.boxes > 0;

        return (
            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Title title="Tarea de Plan Semanal" subtitle="Información de la tarea del plan semanal" />

                    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium text-ink">
                        <span
                            className={`size-2 rounded-full ${complete ? 'bg-[#4d6b2f]' : 'bg-line-strong'}`}
                            aria-hidden="true"
                        />
                        {data.status_message}
                    </span>
                </div>

                <section className="grid grid-cols-1 divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface sm:grid-cols-2 sm:divide-x lg:grid-cols-4 lg:divide-y-0">
                    <div className="p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">SKU</p>
                        <p className="mt-2 font-mono text-2xl tracking-tight text-ink">{data.sku_code}</p>
                        <p className="mt-1 text-sm text-ink-muted">{data.sku_name}</p>
                    </div>

                    <div className="p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">Línea</p>
                        <p className="mt-2 font-mono text-2xl tracking-tight text-ink">{data.line_code}</p>
                        <p className="mt-1 text-sm text-ink-muted">{data.line_name}</p>
                    </div>

                    <div className="p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">Destino</p>
                        <p className="mt-2 text-lg font-medium text-ink">{data.destination}</p>
                    </div>

                    <div className="p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">Día de operación</p>
                        <p className="mt-2 text-lg font-medium text-ink">{data.operation_date_string}</p>
                    </div>
                </section>

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
                            <TimelineStep label="Programada" date={data.operation_date} />
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
}
