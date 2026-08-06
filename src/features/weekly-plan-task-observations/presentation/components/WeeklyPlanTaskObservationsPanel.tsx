import { CustomFilledButton, handleSetQueryParam } from "@/features/shared/shared";
import { weeklyPlanTaskObservationProvider, type WeeklyPlanTaskObservation } from "@/features/weekly-plan-task-observations/weekly-plan-task-observations";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

const formatTimestamp = (value: string) => {
    const [year, month, day] = value.slice(0, 10).split('-');
    if (!year || !month || !day) return value;

    const time = value.match(/[T ](\d{2}:\d{2})/)?.[1];
    const date = `${day} ${MONTHS[Number(month) - 1] ?? ''} ${year}`;

    return time ? `${date} · ${time}` : date;
}

const getInitials = (name: string) => name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(word => word[0] ?? '')
    .join('');

function ObservationRow({ observation }: { observation: WeeklyPlanTaskObservation }) {
    return (
        <article className="flex gap-4 border-l-[3px] border-transparent px-5 py-4 transition-colors hover:border-ink hover:bg-canvas/60 motion-reduce:transition-none">
            <span
                className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md border border-line bg-canvas font-mono text-[11px] uppercase tracking-wide text-ink-muted"
                aria-hidden="true"
            >
                {getInitials(observation.user_name)}
            </span>

            <div className="min-w-0 flex-1">
                <p className="text-sm leading-relaxed whitespace-pre-line text-ink">{observation.observation}</p>

                <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-ink-subtle">
                    <span className="font-medium text-ink-muted">{observation.user_name}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{formatTimestamp(observation.created_at)}</span>

                    {observation.was_edited && (
                        <span className="rounded-full border border-line px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-subtle">
                            Editada
                        </span>
                    )}
                </div>
            </div>
        </article>
    )
}

type Props = {
    weeklyPlanTaskId: string;
}

export function WeeklyPlanTaskObservationsPanel({ weeklyPlanTaskId }: Props) {
    const navigate = useNavigate();
    const location = useLocation();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['getWeeklyPlanTaskObservations', weeklyPlanTaskId],
        queryFn: () => weeklyPlanTaskObservationProvider.getWeeklyPlanTaskObservations('', '', weeklyPlanTaskId),
        retry: false
    });

    const handleOnObservationAction = () => {
        handleSetQueryParam(location, navigate, 'taskObservation', `${weeklyPlanTaskId}`);
    }

    return (
        <section className="space-y-3">

            <div className="flex justify-between items-center gap-5">
                <h2 className="text-sm font-semibold text-ink">Observaciones</h2>
                <CustomFilledButton
                    label="Agregar Observación"
                    icon={<PlusIcon />}
                    type="button"
                    onClick={() => handleOnObservationAction()}
                />
            </div>

            <div className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
                {isLoading && (
                    [0, 1, 2].map(index => (
                        <div key={index} className="flex animate-pulse gap-4 px-5 py-4 motion-reduce:animate-none">
                            <span className="size-9 shrink-0 rounded-md bg-canvas" />

                            <div className="flex-1 space-y-2 py-1">
                                <span className="block h-2.5 w-full rounded-full bg-canvas" />
                                <span className="block h-2.5 w-2/5 rounded-full bg-canvas" />
                            </div>
                        </div>
                    ))
                )}

                {isError && (
                    <p className="px-5 py-10 text-center text-sm text-ink-muted">{error.message}</p>
                )}

                {data?.data.length === 0 && (
                    <div className="px-5 py-10 text-center">
                        <p className="text-sm font-medium text-ink">Sin observaciones</p>
                        <p className="mt-1 text-sm text-ink-muted">Las observaciones que se registren en esta tarea aparecerán aquí.</p>
                    </div>
                )}

                {data?.data.map(observation => (
                    <ObservationRow key={observation.id} observation={observation} />
                ))}
            </div>
        </section>
    )
}
