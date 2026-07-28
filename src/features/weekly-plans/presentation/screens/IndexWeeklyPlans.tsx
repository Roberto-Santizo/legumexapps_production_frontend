import { ActionsMenu, CustomFilledButton, Loading, Pagination, Table, Tbody, Td, Th, Thead, Title, Tr, useNotification, usePagination } from "@/features/shared/shared";
import { CalendarIcon, EditIcon, EyeIcon, PlusIcon, TrashIcon } from "lucide-react";
import { weeklyPlanProvider } from "@/features/weekly-plans/weekly-plans";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

export function IndexWeeklyPlans() {
    const navigate = useNavigate();
    const notification = useNotification();

    const [searchParams, setSearchParams] = useSearchParams();
    const { page, rowsPerPage } = usePagination(searchParams);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['getWeeklyPlans', page + 1, rowsPerPage],
        queryFn: () => weeklyPlanProvider.getWeeklyPlans(`${rowsPerPage}`, `${page + 1}`)
    });

    const { mutate } = useMutation({
        mutationFn: (id: string) => weeklyPlanProvider.deleteWeeklyPlanById(id),
        onSuccess: (message) => {
            notification.success(message);
            refetch();
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const handleDeleteItem = (id: string) => notification.question('¿Desea eliminar el plan semanal?', 'Eliminar', 'El plan semanal se eliminará del sistema', () => mutate(id));
    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <Title title="Planes Semanales" subtitle="Listado de planes semanales registrados" />
                <CustomFilledButton
                    label="Crear Plan Semanal"
                    type="button"
                    icon={<PlusIcon />}
                    onClick={() => navigate('/planes-semanales/crear')}
                />
            </div>

            <section>
                <Table>
                    <Thead>
                        <Th text="Semana" />
                        <Th text="Año" />
                        <Th text="Acciones" />
                    </Thead>

                    <Tbody>
                        {data.data.map(item => (
                            <Tr>
                                <Td>{item.week}</Td>
                                <Td>{item.year}</Td>
                                <Td>
                                    <ActionsMenu
                                        items={[
                                            { label: "Ver Detalles", icon: <EyeIcon />, onClick: () => navigate(`/planes-semanales/${item.id}`) },
                                            { label: "Calendario", icon: <CalendarIcon />, onClick: () => navigate(`/planes-semanales/calendario/${item.id}`) },
                                            { label: "Editar", icon: <EditIcon />, onClick: () => navigate(`/planes-semanales/${item.id}/editar`) },
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
