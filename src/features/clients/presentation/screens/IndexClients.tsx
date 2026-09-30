import { BulkUploadModal, type BulkUploadColumn, ActionsMenu, CustomFilledButton, Loading, Pagination, Table, Tbody, Td, Th, Thead, Title, Tr, usePagination } from "@/features/shared/shared";
import { EditIcon, EyeIcon, PlusIcon, UploadIcon } from "lucide-react";
import { clientProvider } from "@/features/clients/clients";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

const bulkUploadColumns: BulkUploadColumn[] = [
    { header: "Nombre", description: "Nombre único, sin distinguir mayúsculas" },
];

export function IndexClients() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [bulkUpload, setBulkUpload] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const { page, rowsPerPage } = usePagination(searchParams);

    const { data, isLoading } = useQuery({
        queryKey: ['getClients', page + 1, rowsPerPage],
        queryFn: () => clientProvider.getClients(`${rowsPerPage}`, `${page + 1}`)
    });

    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <Title title="Clientes" subtitle="Listado de clientes registrados" />
                <div className="flex gap-3">
                    <CustomFilledButton
                        label="Carga Masiva"
                        type="button"
                        icon={<UploadIcon />}
                        onClick={() => setBulkUpload(true)}
                    />
                    <CustomFilledButton
                        label="Crear Cliente"
                        type="button"
                        icon={<PlusIcon />}
                        onClick={() => navigate('/clientes/crear')}
                    />
                </div>
            </div>

            <BulkUploadModal
                modal={bulkUpload}
                closeModal={() => setBulkUpload(false)}
                title="Carga masiva de clientes"
                templateName="clientes"
                columns={bulkUploadColumns}
                upload={(file) => clientProvider.uploadFile(file)}
                onSuccess={() => queryClient.invalidateQueries({ queryKey: ['getClients'] })}
            />

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
                                            { label: "Ver Detalles", icon: <EyeIcon />, onClick: () => navigate(`/clientes/${item.id}`) },
                                            { label: "Editar", icon: <EditIcon />, onClick: () => navigate(`/clientes/${item.id}/editar`) },
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
