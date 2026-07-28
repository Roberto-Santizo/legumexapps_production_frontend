import { CustomFilledButton, CustomNavTable, Loading, Pagination, Table, Tbody, Td, Th, Thead, Title, Tr, useNotification, usePagination } from "@/features/shared/shared";
import { EditIcon, EyeIcon, PlusIcon, TrashIcon } from "lucide-react";
import { timeoutProvider } from "@/features/timeouts/timeouts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

export function IndexTimeouts() {
    const navigate = useNavigate();
    const notification = useNotification();

    const [searchParams, setSearchParams] = useSearchParams();
    const { page, rowsPerPage } = usePagination(searchParams);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['getTimeouts', page + 1, rowsPerPage],
        queryFn: () => timeoutProvider.getTimeouts(`${rowsPerPage}`, `${page + 1}`)
    });

    const { mutate } = useMutation({
        mutationFn: (id: string) => timeoutProvider.deleteTimeoutById(id),
        onSuccess: (message) => {
            notification.success(message);
            refetch();
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const handleDeleteItem = (id: string) => notification.question('¿Desea eliminar el tiempo muerto?', 'Eliminar', 'El tiempo muerto se eliminará de los registros relacionados', () => mutate(id));
    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <Title title="Tiempos Muertos" subtitle="Listado de tiempos muertos registrados" />
                <CustomFilledButton
                    label="Crear Tiempo Muerto"
                    type="button"
                    icon={<PlusIcon />}
                    onClick={() => navigate('/tiempos-muertos/crear')}
                />
            </div>

            <section>
                <Table>
                    <Thead>
                        <Th text="Nombre" />
                        <Th text="Acciones" />
                    </Thead>

                    <Tbody>
                        {data.data.map(item => (
                            <Tr>
                                <Td>{item.name}</Td>
                                <Td className="flex gap-3">
                                    <CustomNavTable icon={<EyeIcon />} onClick={() => navigate(`/tiempos-muertos/${item.id}`)} />
                                    <CustomNavTable icon={<EditIcon />} onClick={() => navigate(`/tiempos-muertos/${item.id}/editar`)} />
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
