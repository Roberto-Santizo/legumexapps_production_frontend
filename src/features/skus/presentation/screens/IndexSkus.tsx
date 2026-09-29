import { BulkUploadModal, type BulkUploadColumn, ActionsMenu, CustomFilledButton, Loading, Pagination, Table, Tbody, Td, Th, Thead, Title, Tr, usePagination } from "@/features/shared/shared";
import { EditIcon, EyeIcon, PlusIcon, UploadIcon } from "lucide-react";
import { skuProvider } from "@/features/skus/skus";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const bulkUploadColumns: BulkUploadColumn[] = [
    { header: "Código", description: "Código único del SKU" },
    { header: "Nombre Producto", description: "Nombre del producto" },
    { header: "Presentación", description: "Numérico", optional: true },
    { header: "Cajas por Pallet", description: "Número entero", optional: true },
    { header: "Cliente", description: "Nombre de un cliente existente" },
];

export function IndexSkus() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [bulkUpload, setBulkUpload] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const { page, rowsPerPage } = usePagination(searchParams);

    const { data, isLoading } = useQuery({
        queryKey: ['getSkus', page + 1, rowsPerPage],
        queryFn: () => skuProvider.getSkus(`${rowsPerPage}`, `${page + 1}`)
    });

    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <Title title="SKUs" subtitle="Listado de SKUs registrados" />
                <div className="flex gap-3">
                    <CustomFilledButton
                        label="Carga Masiva"
                        type="button"
                        icon={<UploadIcon />}
                        onClick={() => setBulkUpload(true)}
                    />
                    <CustomFilledButton
                        label="Crear SKU"
                        type="button"
                        icon={<PlusIcon />}
                        onClick={() => navigate('/skus/crear')}
                    />
                </div>
            </div>

            <BulkUploadModal
                modal={bulkUpload}
                closeModal={() => setBulkUpload(false)}
                title="Carga masiva de SKUs"
                templateName="skus"
                columns={bulkUploadColumns}
                upload={(file) => skuProvider.uploadFile(file)}
                onSuccess={() => queryClient.invalidateQueries({ queryKey: ['getSkus'] })}
                note="Los clientes deben estar registrados antes de cargar los SKUs."
            />

            <section>
                <Table>
                    <Thead>
                        <Th text="Código" />
                        <Th text="Producto" />
                        <Th text="Presentación" />
                        <Th text="Cajas por Tarima" />
                        <Th text="Cliente" />
                        <Th text="Acciones" />
                    </Thead>

                    <Tbody>
                        {data.data.map(item => (
                            <Tr>
                                <Td>{item.code}</Td>
                                <Td>{item.product_name}</Td>
                                <Td>{item.presentation ?? 'Sin presentación'}</Td>
                                <Td>{item.boxes_per_pallet ?? 'No paletizado'}</Td>
                                <Td>{item.client}</Td>
                                <Td className="flex gap-3">
                                    <ActionsMenu
                                        items={[
                                            { label: "Ver Detalles", icon: <EyeIcon />, onClick: () => navigate(`/skus/${item.code}`) },
                                            { label: "Editar", icon: <EditIcon />, onClick: () => navigate(`/skus/${item.code}/editar`) },
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
