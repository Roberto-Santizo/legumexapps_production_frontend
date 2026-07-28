import { CustomFilledButton, CustomNavTable, Loading, Pagination, Table, Tbody, Td, Th, Thead, Title, Tr, useNotification, usePagination } from "@/features/shared/shared";
import { EditIcon, EyeIcon, PlusIcon, TrashIcon } from "lucide-react";
import { clientProvider } from "@/features/clients/clients";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

export function IndexClients() {
    const navigate = useNavigate();
    const notification = useNotification();

    const [searchParams, setSearchParams] = useSearchParams();
    const { page, rowsPerPage } = usePagination(searchParams);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['getClients', page + 1, rowsPerPage],
        queryFn: () => clientProvider.getClients(`${rowsPerPage}`, `${page + 1}`)
    });

    const { mutate } = useMutation({
        mutationFn: (id: string) => clientProvider.deleteClientById(id),
        onSuccess: (message) => {
            notification.success(message);
            refetch();
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const handleDeleteItem = (id: string) => notification.question('¿Desea eliminar el cliente?', 'Eliminar', 'El cliente se eliminará de las recetas relacionadas', () => mutate(id));
    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <Title title="Clientes" subtitle="Listado de clientes registrados" />
                <CustomFilledButton
                    label="Crear Cliente"
                    type="button"
                    icon={<PlusIcon />}
                    onClick={() => navigate('/clientes/crear')}
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
                                    <CustomNavTable icon={<EyeIcon />} onClick={() => navigate(`/clientes/${item.id}`)} />
                                    <CustomNavTable icon={<EditIcon />} onClick={() => navigate(`/clientes/${item.id}/editar`)} />
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
