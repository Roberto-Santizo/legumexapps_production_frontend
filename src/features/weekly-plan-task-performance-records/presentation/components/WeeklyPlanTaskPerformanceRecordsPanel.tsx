import { handleSetQueryParam } from "@/features/shared/shared";
import { PerformanceRecordCell, PerformanceRecordRow, PerformanceRecordsEmptyState, PerformanceRecordsPanelHeader, PerformanceRecordsSkeleton, PerformanceRecordsTableHead, PerformanceRecordsTotalsRow, performanceRecordsQueryKey, summarizePerformanceRecords, useDeleteWeeklyPlanTaskPerformanceRecord, usePalletCaptureFields, weeklyPlanTaskPerformanceRecordProvider, type WeeklyPlanTaskPerformanceRecord } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
    weeklyPlanTaskId: string;
    lineCode: string;
    editable: boolean;
}

export function WeeklyPlanTaskPerformanceRecordsPanel({ weeklyPlanTaskId, lineCode, editable }: Props) {
    const navigate = useNavigate();
    const location = useLocation();
    const { handleDeleteRecord } = useDeleteWeeklyPlanTaskPerformanceRecord(weeklyPlanTaskId);
    const { columns, isLoading: isLoadingColumns } = usePalletCaptureFields(lineCode);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: performanceRecordsQueryKey(weeklyPlanTaskId),
        queryFn: () => weeklyPlanTaskPerformanceRecordProvider.getWeeklyPlanTaskPerformanceRecords(weeklyPlanTaskId),
        retry: false
    });

    const handleEdit = (record: WeeklyPlanTaskPerformanceRecord) =>
        handleSetQueryParam(location, navigate, 'editPerformanceRecord', String(record.id));

    return (
        <section className="space-y-3">
            <PerformanceRecordsPanelHeader title="Tomas de rendimiento" editable={editable} />

            {(isLoading || isLoadingColumns) && <PerformanceRecordsSkeleton />}

            {isError && (
                <p className="rounded-xl border border-line bg-surface px-5 py-10 text-center text-sm text-ink-muted">{error.message}</p>
            )}

            {!isLoadingColumns && data?.length === 0 && (
                <PerformanceRecordsEmptyState
                    title="Sin tarimas registradas"
                    message={editable
                        ? 'Registra las tarimas desde la opción "Rendimiento" en las tareas del día.'
                        : 'Esta tarea no tiene tarimas registradas.'}
                />
            )}

            {!isLoadingColumns && data && data.length > 0 && (
                <div className="table-wrapper">
                    <table className="table">
                        <PerformanceRecordsTableHead columns={columns} editable={editable} />

                        <tbody className="tbody">
                            {data.map(record => (
                                <PerformanceRecordRow
                                    key={record.id}
                                    record={record}
                                    editable={editable}
                                    onEdit={handleEdit}
                                    onDelete={(item) => handleDeleteRecord(String(item.id))}
                                >
                                    {columns.map(column => (
                                        <PerformanceRecordCell key={column.key} column={column} record={record} />
                                    ))}
                                </PerformanceRecordRow>
                            ))}
                        </tbody>

                        <tfoot>
                            <PerformanceRecordsTotalsRow summary={summarizePerformanceRecords(data)} columns={columns} editable={editable} />
                        </tfoot>
                    </table>
                </div>
            )}
        </section>
    )
}
