import { handleSetQueryParam } from "@/features/shared/shared";
import { PerformanceRecordRow, PerformanceRecordsTotalsRow, performanceRecordsQueryKey, summarizePerformanceRecords, useDeleteWeeklyPlanTaskPerformanceRecord, weeklyPlanTaskPerformanceRecordProvider, type WeeklyPlanTaskPerformanceRecord } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

const HEADERS = [
    { label: 'Pallet', align: 'text-left' },
    { label: 'Cajas', align: 'text-right' },
    { label: 'Pesado (lbs)', align: 'text-right' },
    { label: 'Teórico (lbs)', align: 'text-right' },
    { label: 'Diferencia', align: 'text-right' },
    { label: 'Registró', align: 'text-left' },
];

type Props = {
    weeklyPlanTaskId: string;
    editable: boolean;
}

export function WeeklyPlanTaskPerformanceRecordsPanel({ weeklyPlanTaskId, editable }: Props) {
    const navigate = useNavigate();
    const location = useLocation();
    const { handleDeleteRecord } = useDeleteWeeklyPlanTaskPerformanceRecord(weeklyPlanTaskId);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: performanceRecordsQueryKey(weeklyPlanTaskId),
        queryFn: () => weeklyPlanTaskPerformanceRecordProvider.getWeeklyPlanTaskPerformanceRecords(weeklyPlanTaskId),
        retry: false
    });

    const handleEdit = (record: WeeklyPlanTaskPerformanceRecord) =>
        handleSetQueryParam(location, navigate, 'editPerformanceRecord', String(record.id));

    return (
        <section className="space-y-3">
            <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-sm font-semibold text-ink">Tomas de rendimiento</h2>
                {!editable && (
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">Solo lectura</p>
                )}
            </div>

            {isLoading && (
                <div className="space-y-px overflow-hidden rounded-xl border border-line bg-surface">
                    {[0, 1, 2].map(index => (
                        <div key={index} className="flex animate-pulse gap-6 px-5 py-4 motion-reduce:animate-none">
                            <span className="h-2.5 w-10 rounded-full bg-canvas" />
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
                    <p className="text-sm font-medium text-ink">Sin tomas de rendimiento</p>
                    <p className="mt-1 text-sm text-ink-muted">
                        {editable
                            ? 'Registra las pallets pesadas desde la opción "Rendimiento" en las tareas del día.'
                            : 'Esta tarea no tiene pallets pesadas registradas.'}
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
                            {data.map(record => (
                                <PerformanceRecordRow
                                    key={record.id}
                                    record={record}
                                    editable={editable}
                                    onEdit={handleEdit}
                                    onDelete={(item) => handleDeleteRecord(String(item.id))}
                                />
                            ))}
                        </tbody>

                        <tfoot>
                            <PerformanceRecordsTotalsRow summary={summarizePerformanceRecords(data)} editable={editable} />
                        </tfoot>
                    </table>
                </div>
            )}
        </section>
    )
}
