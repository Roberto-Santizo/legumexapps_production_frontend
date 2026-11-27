import { FiltersButton, FiltersDrawer, BulkUploadModal, type BulkUploadColumn, CustomFilledButton, Loading, Pagination, Title, usePagination } from "@/features/shared/shared";
import { PlusIcon, UploadIcon } from "lucide-react";
import { createPerformancePath, editPerformancePath, invalidatePerformanceQueries, performanceFilterFields, performanceProvider, performancesQueryKey, PerformancesTable, showPerformancePath, useDeletePerformance, usePerformancesFilters, useTogglePerformanceStatus } from "@/features/performances/performances";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

const bulkUploadColumns: BulkUploadColumn[] = [
    { header: "SKU", description: "Código de un SKU existente" },
    { header: "Línea", description: "Código de una línea existente" },
    { header: "Rendimiento Lbs", description: "Numérico" },
    { header: "Porcentaje Aceptado", description: "Numérico" },
    { header: "Método Pago", description: "1, 0, SI o NO" },
];

export function IndexPerformances() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [bulkUpload, setBulkUpload] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const { filters, setFilters, clearFilters } = usePerformancesFilters();
    const { page, rowsPerPage } = usePagination(searchParams);
    const { handleDeletePerformance } = useDeletePerformance();
    const { toggleStatus } = useTogglePerformanceStatus();

    const { data, isLoading } = useQuery({
        queryKey: [...performancesQueryKey, page + 1, rowsPerPage, filters],
        queryFn: () => performanceProvider.getPerformances(`${rowsPerPage}`, `${page + 1}`, filters)
    });

    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <Title title="Rendimientos" subtitle="Listado de rendimientos registrados" />
                <div className="flex gap-3">
                    <FiltersButton filters={filters} onClick={() => setShowFilters(true)} />
                    <CustomFilledButton
                        label="Carga Masiva"
                        type="button"
                        icon={<UploadIcon />}
                        onClick={() => setBulkUpload(true)}
                    />
                    <CustomFilledButton
                        label="Crear Rendimiento"
                        type="button"
                        icon={<PlusIcon />}
                        onClick={() => navigate(createPerformancePath())}
                    />
                </div>
            </div>

            <FiltersDrawer
                open={showFilters}
                close={() => setShowFilters(false)}
                fields={performanceFilterFields}
                filters={filters}
                setFilters={setFilters}
                clearFilters={clearFilters}
            />

            <BulkUploadModal
                modal={bulkUpload}
                closeModal={() => setBulkUpload(false)}
                title="Carga masiva de rendimientos"
                templateName="rendimientos_linea_sku"
                columns={bulkUploadColumns}
                upload={(file) => performanceProvider.uploadFile(file)}
                onSuccess={() => invalidatePerformanceQueries(queryClient)}
                note="Las líneas y los SKUs deben estar registrados antes. El par SKU–Línea no puede repetirse."
            />

            <section>
                <PerformancesTable
                    performances={data.data}
                    onShow={item => navigate(showPerformancePath(item.id))}
                    onEdit={item => navigate(editPerformancePath(item.id))}
                    onDelete={handleDeletePerformance}
                    onToggleStatus={item => toggleStatus(item.id)}
                />
            </section>

            <Pagination
                count={data.total!}
                page={page}
                rowsPerPage={rowsPerPage}
                setSearchParams={setSearchParams}
            />
        </div>
    )
}
