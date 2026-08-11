import { ActionsMenu, CustomFilledButton, Loading, Pagination, StatusTag, Table, Tbody, Td, Th, Thead, Title, Tr, usePagination } from "@/features/shared/shared";
import { EditIcon, EyeIcon, PlusIcon } from "lucide-react";
import { positionProvider } from "@/features/positions/positions";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

export function IndexPositions() {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const { page, rowsPerPage } = usePagination(searchParams);

    const { data, isLoading } = useQuery({
        queryKey: ['getPositions', page + 1, rowsPerPage],
        queryFn: () => positionProvider.getPositions(`${rowsPerPage}`, `${page + 1}`)
    });

    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <Title title="Puestos" subtitle="Listado de puestos registrados" />
                <CustomFilledButton
                    label="Crear Puesto"
                    type="button"
                    icon={<PlusIcon />}
                    onClick={() => navigate('/posiciones/crear')}
                />
            </div>

            <section>
                <Table>
                    <Thead>
                        <Th text="Código" />
                        <Th text="Actividad" />
                        <Th text="Línea" />
                        <Th text="Estado" />
                        <Th text="Acciones" />
                    </Thead>

                    <Tbody>
                        {data.data.map(item => (
                            <Tr>
                                <Td>{item.code}</Td>
                                <Td>{item.activity}</Td>
                                <Td>{item.line}</Td>
                                <Td>
                                    <StatusTag flag={item.status} />
                                </Td>
                                <Td className="flex gap-3">
                                    <ActionsMenu
                                        items={[
                                            { label: "Ver Detalles", icon: <EyeIcon />, onClick: () => navigate(`/posiciones/${item.id}`) },
                                            { label: "Editar", icon: <EditIcon />, onClick: () => navigate(`/posiciones/${item.id}/editar`) },
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
