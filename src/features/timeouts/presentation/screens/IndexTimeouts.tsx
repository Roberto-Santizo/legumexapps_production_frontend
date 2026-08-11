import { ActionsMenu, CustomFilledButton, Loading, Pagination, Table, Tbody, Td, Th, Thead, Title, Tr, usePagination } from "@/features/shared/shared";
import { EditIcon, EyeIcon, PlusIcon } from "lucide-react";
import { timeoutProvider } from "@/features/timeouts/timeouts";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

export function IndexTimeouts() {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const { page, rowsPerPage } = usePagination(searchParams);

    const { data, isLoading } = useQuery({
        queryKey: ['getTimeouts', page + 1, rowsPerPage],
        queryFn: () => timeoutProvider.getTimeouts(`${rowsPerPage}`, `${page + 1}`)
    });

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
                                    <ActionsMenu
                                        items={[
                                            { label: "Ver Detalles", icon: <EyeIcon />, onClick: () => navigate(`/tiempos-muertos/${item.id}`) },
                                            { label: "Editar", icon: <EditIcon />, onClick: () => navigate(`/tiempos-muertos/${item.id}/editar`) },
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
