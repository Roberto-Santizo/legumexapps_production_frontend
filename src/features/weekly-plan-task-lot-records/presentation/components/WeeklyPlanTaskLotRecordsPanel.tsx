import { handleSetQueryParam } from "@/features/shared/shared";
import { PerformanceRecordRow, PerformanceRecordsEmptyState, PerformanceRecordsPanelHeader, PerformanceRecordsSkeleton, PerformanceRecordsTableHead } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { LotRecordCell, LotRecordsTotalsRow, lotRecordsQueryKey, summarizeLotRecords, useDeleteWeeklyPlanTaskLotRecord, useLotCaptureFields, weeklyPlanTaskLotRecordProvider, type WeeklyPlanTaskLotRecord } from "@/features/weekly-plan-task-lot-records/weekly-plan-task-lot-records";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
    weeklyPlanTaskId: string;
    lineCode: string;
    editable: boolean;
}

export function WeeklyPlanTaskLotRecordsPanel({ weeklyPlanTaskId, lineCode, editable }: Props) {
    const navigate = useNavigate();
    const location = useLocation();
    const { handleDeleteRecord } = useDeleteWeeklyPlanTaskLotRecord(weeklyPlanTaskId);
    const { columns, isLoading: isLoadingColumns } = useLotCaptureFields(lineCode);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: lotRecordsQueryKey(weeklyPlanTaskId),
        queryFn: () => weeklyPlanTaskLotRecordProvider.getWeeklyPlanTaskLotRecords(weeklyPlanTaskId),
        retry: false
    });

    const handleEdit = (record: WeeklyPlanTaskLotRecord) =>
        handleSetQueryParam(location, navigate, 'editLotRecord', String(record.id));

    return (
        <section className="space-y-3">
            <PerformanceRecordsPanelHeader title="Lotes de materia prima" editable={editable} />

            {(isLoading || isLoadingColumns) && <PerformanceRecordsSkeleton />}

            {isError && (
                <p className="rounded-xl border border-line bg-surface px-5 py-10 text-center text-sm text-ink-muted">{error.message}</p>
            )}

            {!isLoadingColumns && data?.length === 0 && (
                <PerformanceRecordsEmptyState
                    title="Sin lotes registrados"
                    message={editable
                        ? 'Registra cada GRN que entra a la línea desde la opción "Registrar lote" en las tareas del día.'
                        : 'Esta tarea no tiene lotes registrados.'}
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
                                        <LotRecordCell key={column.key} column={column} record={record} />
                                    ))}
                                </PerformanceRecordRow>
                            ))}
                        </tbody>

                        <tfoot>
                            <LotRecordsTotalsRow summary={summarizeLotRecords(data)} columns={columns} editable={editable} />
                        </tfoot>
                    </table>
                </div>
            )}
        </section>
    )
}
