import { CustomFilledButton, CustomNavTable, Loading, Pagination, Table, Tbody, Td, Th, Thead, Title, Tr, useNotification, usePagination } from "@/features/shared/shared";
import { EditIcon, EyeIcon, FilterIcon, PlusIcon, TrashIcon } from "lucide-react";
import { PerformanceFiltersComponent, performanceProvider, usePerformancesFilters } from "@/features/performances/performances";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

export function IndexPerformances() {
    const navigate = useNavigate();
    const notification = useNotification();
    const [showFilters, setShowFilters] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const { filters } = usePerformancesFilters();
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
                    <CustomFilledButton
                        label="Crear Rendimiento"
                        type="button"
                        icon={<PlusIcon />}
                        onClick={() => navigate('/rendimientos/crear')}
                    />
                    <CustomFilledButton
                        label="Filtros"
                        type="button"
                        icon={<FilterIcon />}
                        onClick={() => setShowFilters(true)}
                    />
                </div>
            </div>

            <PerformanceFiltersComponent close={() => setShowFilters(false)} showFilters={showFilters} />

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
                                <Td>{item.status ? 'Inactivo' : 'Activo'}</Td>
                                <Td className="flex gap-3">
                                    <CustomNavTable icon={<EyeIcon />} onClick={() => navigate(`/rendimientos/${item.id}`)} />
                                    <CustomNavTable icon={<EditIcon />} onClick={() => navigate(`/rendimientos/${item.id}/editar`)} />
                                    <CustomNavTable icon={<TrashIcon />} onClick={() => handleDeleteItem(`${item.id}`)} />
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
