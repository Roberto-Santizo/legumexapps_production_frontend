import { handleSetQueryParam } from "@/features/shared/shared";
import { EndTimeoutButton, findOpenTimeout, StoppedLineBanner, sumClosedTimeoutHours, TimeoutRow, TimeoutsTotalsRow, useDeleteWeeklyPlanTaskTimeout, weeklyPlanTaskTimeoutProvider, weeklyPlanTaskTimeoutsQueryKey, type WeeklyPlanTaskTimeout } from "@/features/weekly-plan-task-timeouts/weekly-plan-task-timeouts";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

const HEADERS = [
    { label: 'Tipo', align: 'text-left' },
    { label: 'Inicio', align: 'text-left' },
    { label: 'Fin', align: 'text-left' },
    { label: 'Duración', align: 'text-right' },
    { label: 'Registró', align: 'text-left' },
];

type Props = {
    weeklyPlanTaskId: string;
    editable: boolean;
}

export function WeeklyPlanTaskTimeoutsPanel({ weeklyPlanTaskId, editable }: Props) {
    const navigate = useNavigate();
    const location = useLocation();
    const { handleDeleteTimeout } = useDeleteWeeklyPlanTaskTimeout(weeklyPlanTaskId);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: weeklyPlanTaskTimeoutsQueryKey(weeklyPlanTaskId),
        queryFn: () => weeklyPlanTaskTimeoutProvider.getWeeklyPlanTaskTimeouts(weeklyPlanTaskId),
        retry: false
    });

    const openTimeout = data ? findOpenTimeout(data) : null;

    const handleEdit = (timeout: WeeklyPlanTaskTimeout) =>
        handleSetQueryParam(location, navigate, 'editTaskTimeout', String(timeout.id));

    const handleEnd = () => handleSetQueryParam(location, navigate, 'endTimeout', weeklyPlanTaskId);

    return (
        <section className="space-y-3">
            <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-sm font-semibold text-ink">Tiempos muertos</h2>
                {!editable && (
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">Solo lectura</p>
                )}
            </div>

            {openTimeout && (
                <StoppedLineBanner
                    timeout={openTimeout}
                    action={editable && <EndTimeoutButton onClick={handleEnd} />}
                />
            )}

            {isLoading && (
                <div className="space-y-px overflow-hidden rounded-xl border border-line bg-surface">
                    {[0, 1, 2].map(index => (
                        <div key={index} className="flex animate-pulse gap-6 px-5 py-4 motion-reduce:animate-none">
                            <span className="h-2.5 w-24 rounded-full bg-canvas" />
                            <span className="h-2.5 flex-1 rounded-full bg-canvas" />
                        </div>
                    ))}
                </div>
            )}

            {isError && (
                <p className="rounded-xl border border-line bg-surface px-5 py-10 text-center text-sm text-ink-muted">{error.message}</p>
            )}

            {data?.length === 0 && (
                <div className="rounded-xl border border-dashed border-line-strong bg-surface px-5 py-10 text-center">
                    <p className="text-sm font-medium text-ink">Sin tiempos muertos</p>
                    <p className="mt-1 text-sm text-ink-muted">
                        {editable
                            ? 'Abre un tiempo muerto desde la opción "Abrir Tiempo Muerto" en las tareas del día cuando la línea se detenga.'
                            : 'La línea no registró paros durante esta tarea.'}
                    </p>
                </div>
            )}

            {data && data.length > 0 && (
                <div className="table-wrapper">
                    <table className="table">
                        <thead className="thead">
                            <tr>
                                {HEADERS.map(header => (
                                    <th key={header.label} className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider text-ink-subtle ${header.align}`}>
                                        {header.label}
                                    </th>
                                ))}
                                {editable && <th className="px-3 py-3"><span className="sr-only">Acciones</span></th>}
                            </tr>
                        </thead>

                        <tbody className="tbody">
                            {data.map(timeout => (
                                <TimeoutRow
                                    key={timeout.id}
                                    timeout={timeout}
                                    editable={editable}
                                    onEdit={handleEdit}
                                    onDelete={(item) => handleDeleteTimeout(String(item.id))}
                                />
                            ))}
                        </tbody>

                        <tfoot>
                            <TimeoutsTotalsRow count={data.length} closedHours={sumClosedTimeoutHours(data)} editable={editable} />
                        </tfoot>
                    </table>
                </div>
            )}
        </section>
    )
}
