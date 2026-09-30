import { FiltersButton, FiltersDrawer, BulkUploadModal, type BulkUploadColumn, ActionsMenu, CustomFilledButton, Loading, Pagination, StatusTag, Table, Tbody, Td, Th, Thead, Title, Tr, useNotification, usePagination } from "@/features/shared/shared";
import { EditIcon, EyeIcon, PlusIcon, TrashIcon, UploadIcon } from "lucide-react";
import { performanceFilterFields, performanceProvider, usePerformancesFilters } from "@/features/performances/performances";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
    const notification = useNotification();
    const [showFilters, setShowFilters] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const { filters, setFilters, clearFilters } = usePerformancesFilters();
    const { page, rowsPerPage } = usePagination(searchParams);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['getPerformances', page + 1, rowsPerPage, filters],
        queryFn: () => performanceProvider.getPerformances(`${rowsPerPage}`, `${page + 1}`, filters)
    });

    const { mutate } = useMutation({
        mutationFn: (id: string) => performanceProvider.deletePerformanceById(id),
        onSuccess: (message) => {
            notification.success(message);
            refetch();
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const handleDeleteItem = (id: string) => notification.question('¿Desea eliminar el rendimiento?', 'Eliminar', 'El rendimiento se eliminará del sistema', () => mutate(id));
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
                        onClick={() => navigate('/rendimientos/crear')}
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
                onSuccess={() => queryClient.invalidateQueries({ queryKey: ['getPerformances'] })}
                note="Las líneas y los SKUs deben estar registrados antes. El par SKU–Línea no puede repetirse."
            />

            <section>
                <Table>
                    <Thead>
                        <Th text="SKU" />
                        <Th text="Línea" />
                        <Th text="Libras de Rendimiento" />
                        <Th text="Porcentaje Aceptado" />
                        <Th text="Método de Pago" />
                        <Th text="Estado" />
                        <Th text="Acciones" />
                    </Thead>

                    <Tbody>
                        {data.data.map(item => (
                            <Tr key={item.id}>
                                <Td>{item.sku}</Td>
                                <Td>{item.line}</Td>
                                <Td>{item.lbs_performance}</Td>
                                <Td>{item.accepted_percentage}</Td>
                                <Td>{item.payment_method === 0 ? 'Horas Linea' : 'Horas Rendimiento'}</Td>
                                <Td>
                                    <StatusTag flag={item.status}/>
                                </Td>
                                <Td className="flex gap-3">
                                    <ActionsMenu
                                        items={[
                                            { label: "Ver Detalles", icon: <EyeIcon />, onClick: () => navigate(`/rendimientos/${item.id}`) },
                                            { label: "Editar", icon: <EditIcon />, onClick: () => navigate(`/rendimientos/${item.id}/editar`) },
                                            { label: "Eliminar", icon: <TrashIcon />, onClick: () => handleDeleteItem(`${item.id}`), danger: true },
                                        ]}
                                    />
                                </Td>
                            </Tr>

                        ))}
                    </Tbody>
                </Table>
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
