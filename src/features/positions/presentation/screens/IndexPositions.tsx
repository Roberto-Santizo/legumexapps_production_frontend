import { BulkUploadModal, type BulkUploadColumn, ActionsMenu, CustomFilledButton, Loading, Pagination, StatusTag, Table, Tbody, Td, Th, Thead, Title, Tr, usePagination } from "@/features/shared/shared";
import { EditIcon, EyeIcon, PlusIcon, UploadIcon } from "lucide-react";
import { positionProvider } from "@/features/positions/positions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

const bulkUploadColumns: BulkUploadColumn[] = [
    { header: "Código", description: "Código único del puesto" },
    { header: "Actividad", description: "Actividad del puesto" },
    { header: "Línea", description: "Código de una línea existente" },
];

export function IndexPositions() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [bulkUpload, setBulkUpload] = useState(false);

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
                <div className="flex gap-3">
                    <CustomFilledButton
                        label="Carga Masiva"
                        type="button"
                        icon={<UploadIcon />}
                        onClick={() => setBulkUpload(true)}
                    />
                    <CustomFilledButton
                        label="Crear Puesto"
                        type="button"
                        icon={<PlusIcon />}
                        onClick={() => navigate('/posiciones/crear')}
                    />
                </div>
            </div>

            <BulkUploadModal
                modal={bulkUpload}
                closeModal={() => setBulkUpload(false)}
                title="Carga masiva de puestos"
                templateName="posiciones"
                columns={bulkUploadColumns}
                upload={(file) => positionProvider.uploadFile(file)}
                onSuccess={() => queryClient.invalidateQueries({ queryKey: ['getPositions'] })}
                note="Las líneas deben estar registradas antes de cargar los puestos."
            />

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
