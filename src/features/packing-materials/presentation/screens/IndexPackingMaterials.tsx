import { BulkUploadModal, type BulkUploadColumn, ActionsMenu, CustomFilledButton, Loading, Pagination, Table, Tbody, Td, Th, Thead, Title, Tr, usePagination } from "@/features/shared/shared";
import { EditIcon, EyeIcon, PlusIcon, UploadIcon } from "lucide-react";
import { packingMaterialProvider } from "@/features/packing-materials/packing-materials";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

const bulkUploadColumns: BulkUploadColumn[] = [
    { header: "Código", description: "Código único del material" },
    { header: "Nombre", description: "Nombre del material" },
    { header: "Descripción", description: "Descripción del material" },
];

export function IndexPackingMaterials() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [bulkUpload, setBulkUpload] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const { page, rowsPerPage } = usePagination(searchParams);

    const { data, isLoading } = useQuery({
        queryKey: ['getPackingMaterialItems', page + 1, rowsPerPage],
        queryFn: () => packingMaterialProvider.getPackingMaterialItems(`${rowsPerPage}`, `${page + 1}`)
    });

    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <Title title="Materiales de Empaque" subtitle="Listado de materiales de empaque registrados" />
                <div className="flex gap-3">
                    <CustomFilledButton
                        label="Carga Masiva"
                        type="button"
                        icon={<UploadIcon />}
                        onClick={() => setBulkUpload(true)}
                    />
                    <CustomFilledButton
                        label="Crear Item"
                        type="button"
                        icon={<PlusIcon />}
                        onClick={() => navigate('/items-material-empaque/crear')}
                    />
                </div>
            </div>

            <BulkUploadModal
                modal={bulkUpload}
                closeModal={() => setBulkUpload(false)}
                title="Carga masiva de materiales de empaque"
                templateName="materiales_empaque"
                columns={bulkUploadColumns}
                upload={(file) => packingMaterialProvider.uploadFile(file)}
                onSuccess={() => queryClient.invalidateQueries({ queryKey: ['getPackingMaterialItems'] })}
            />

            <section>
                <Table>
                    <Thead>
                        <Th text="Linea" />
                        <Th text="Código" />
                        <Th text="Acciones" />
                    </Thead>

                    <Tbody>
                        {data.data.map(item => (
                            <Tr>
                                <Td>{item.name}</Td>
                                <Td>{item.code}</Td>
                                <Td className="flex gap-3">
                                    <ActionsMenu
                                        items={[
                                            { label: "Ver Detalles", icon: <EyeIcon />, onClick: () => navigate(`/items-material-empaque/${item.code}`) },
                                            { label: "Editar", icon: <EditIcon />, onClick: () => navigate(`/items-material-empaque/${item.code}/editar`) },
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
