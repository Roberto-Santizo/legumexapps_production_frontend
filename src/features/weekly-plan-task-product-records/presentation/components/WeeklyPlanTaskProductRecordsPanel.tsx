import { handleSetQueryParam } from "@/features/shared/shared";
import { PerformanceRecordRow, PerformanceRecordsEmptyState, PerformanceRecordsPanelHeader, PerformanceRecordsSkeleton, PerformanceRecordsTableHead } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { ProductRecordCell, ProductRecordsTotalsRow, productRecordsQueryKey, summarizeProductRecords, useDeleteWeeklyPlanTaskProductRecord, useProductCaptureFields, weeklyPlanTaskProductRecordProvider, type WeeklyPlanTaskProductRecord } from "@/features/weekly-plan-task-product-records/weekly-plan-task-product-records";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
    weeklyPlanTaskId: string;
    lineCode: string;
    editable: boolean;
}

export function WeeklyPlanTaskProductRecordsPanel({ weeklyPlanTaskId, lineCode, editable }: Props) {
    const navigate = useNavigate();
    const location = useLocation();
    const { handleDeleteRecord } = useDeleteWeeklyPlanTaskProductRecord(weeklyPlanTaskId);
    const { columns, isLoading: isLoadingColumns } = useProductCaptureFields(lineCode);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: productRecordsQueryKey(weeklyPlanTaskId),
        queryFn: () => weeklyPlanTaskProductRecordProvider.getWeeklyPlanTaskProductRecords(weeklyPlanTaskId),
        retry: false
    });

    const handleEdit = (record: WeeklyPlanTaskProductRecord) =>
        handleSetQueryParam(location, navigate, 'editProductRecord', String(record.id));

    return (
        <section className="space-y-3">
            <PerformanceRecordsPanelHeader title="Productos procesados" editable={editable} />

            {(isLoading || isLoadingColumns) && <PerformanceRecordsSkeleton />}

            {isError && (
                <p className="rounded-xl border border-line bg-surface px-5 py-10 text-center text-sm text-ink-muted">{error.message}</p>
            )}

            {!isLoadingColumns && data?.length === 0 && (
                <PerformanceRecordsEmptyState
                    title="Sin productos registrados"
                    message={editable
                        ? 'Registra cada variante que procesa la línea desde la opción "Registrar producto" en las tareas del día.'
                        : 'Esta tarea no tiene productos registrados.'}
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
                                        <ProductRecordCell key={column.key} column={column} record={record} />
                                    ))}
                                </PerformanceRecordRow>
                            ))}
                        </tbody>

                        <tfoot>
                            <ProductRecordsTotalsRow summary={summarizeProductRecords(data)} columns={columns} editable={editable} />
                        </tfoot>
                    </table>
                </div>
            )}
        </section>
    )
}
