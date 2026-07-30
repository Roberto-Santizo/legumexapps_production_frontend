import { CustomFilledButton, CustomNavTable, Loading, Pagination, Table, Tbody, Td, Th, Thead, Title, Tr, useNotification, usePagination } from "@/features/shared/shared";
import { EditIcon, EyeIcon, PlusIcon, TrashIcon } from "lucide-react";
import { weeklyPlanTaskProvider } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

export function IndexWeeklyPlanTasks() {
    const navigate = useNavigate();
    const notification = useNotification();

    const [searchParams, setSearchParams] = useSearchParams();
    const { page, rowsPerPage } = usePagination(searchParams);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['getWeeklyPlanTasks', page + 1, rowsPerPage],
        queryFn: () => weeklyPlanTaskProvider.getWeeklyPlanTasks('', '', '', `${rowsPerPage}`, `${page + 1}`)
    });

    const { mutate } = useMutation({
        mutationFn: (id: string) => weeklyPlanTaskProvider.deleteWeeklyPlanTaskById(id),
        onSuccess: (message) => {
            notification.success(message);
            refetch();
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const handleDeleteItem = (id: string) => notification.question('¿Desea eliminar la tarea del plan semanal?', 'Eliminar', 'La tarea se eliminará del sistema', () => mutate(id));
    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <Title title="Tareas de Planes Semanales" subtitle="Listado de tareas de planes semanales registradas" />
                <CustomFilledButton
                    label="Crear Tarea"
                    type="button"
                    icon={<PlusIcon />}
                    onClick={() => navigate('/planes-semanales-tareas/crear')}
                />
            </div>

            <section>
                <Table>
                    <Thead>
                        <Th text="SKU" />
                        <Th text="Línea" />
                        <Th text="Destino" />
                        <Th text="Cajas" />
                        <Th text="Fecha de Operación" />
                        <Th text="Acciones" />
                    </Thead>

                    <Tbody>
                        {data.data.map(item => (
                            <Tr>
                                <Td>{item.sku_name}</Td>
                                <Td>{item.line_name}</Td>
                                <Td>{item.destination}</Td>
                                <Td>{item.boxes}</Td>
                                <Td>{item.operation_date}</Td>
                                <Td className="flex gap-3">
                                    <CustomNavTable icon={<EyeIcon />} onClick={() => navigate(`/planes-semanales-tareas/${item.id}`)} />
                                    <CustomNavTable icon={<EditIcon />} onClick={() => navigate(`/planes-semanales-tareas/${item.id}/editar`)} />
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
