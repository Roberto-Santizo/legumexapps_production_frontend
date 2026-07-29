import { ActionsMenu, CustomFilledButton, Loading, Pagination, Table, Tbody, Td, Th, Thead, Title, Tr, useNotification, usePagination } from "@/features/shared/shared";
import { EditIcon, EyeIcon, PlusIcon, TrashIcon } from "lucide-react";
import { draftWeeklyPlanProvider } from "@/features/draft-weekly-plans/draft-weekly-plans";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

export function IndexDraftWeeklyPlans() {
    const navigate = useNavigate();
    const notification = useNotification();

    const [searchParams, setSearchParams] = useSearchParams();
    const { page, rowsPerPage } = usePagination(searchParams);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['getDraftWeeklyPlans', page + 1, rowsPerPage],
        queryFn: () => draftWeeklyPlanProvider.getDraftWeeklyPlans(`${rowsPerPage}`, `${page + 1}`)
    });

    const { mutate } = useMutation({
        mutationFn: (id: string) => draftWeeklyPlanProvider.deleteDraftWeeklyPlanById(id),
        onSuccess: (message) => {
            notification.success(message);
            refetch();
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const handleDeleteItem = (id: string) => notification.question('¿Desea eliminar el plan semanal?', 'Eliminar', 'El plan semanal se eliminará', () => mutate(id));
    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <Title title="Planes Semanales Borrador" subtitle="Listado de planes semanales borrador registrados" />
                <CustomFilledButton
                    label="Crear Plan"
                    type="button"
                    icon={<PlusIcon />}
                    onClick={() => navigate('/draft-planes-semanales/crear')}
                />
            </div>

            <section>
                <Table>
                    <Thead>
                        <Th text="Semana" />
                        <Th text="Año" />
                        <Th text="Fecha de Confirmación" />
                        <Th text="Acciones" />
                    </Thead>

                    <Tbody>
                        {data.data.map(item => (
                            <Tr key={item.id}>
                                <Td>{item.week}</Td>
                                <Td>{item.year}</Td>
                                <Td>{item.confirmation_date ?? '-'}</Td>
                                <Td className="flex gap-3">
                                     <ActionsMenu
                                        items={[
                                            { label: "Ver Detalles", icon: <EyeIcon />, onClick: () => navigate(`/draft-planes-semanales/${item.id}`) },
                                            { label: "Editar", icon: <EditIcon />, onClick: () => navigate(`/draft-planes-semanales/${item.id}/editar`) },
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
