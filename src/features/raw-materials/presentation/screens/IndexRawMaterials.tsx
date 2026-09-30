import { FiltersButton, FiltersDrawer, BulkUploadModal, type BulkUploadColumn, ActionsMenu, CustomFilledButton, Loading, Pagination, Table, Tbody, Td, Th, Thead, Title, Tr, usePagination } from "@/features/shared/shared";
import { EditIcon, EyeIcon, PlusIcon, UploadIcon } from "lucide-react";
import { rawMaterialProvider, useRawMaterialFilters, rawMaterialFilterFields } from "@/features/raw-materials/raw-materials";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

const bulkUploadColumns: BulkUploadColumn[] = [
    { header: "Código", description: "Código único de la materia prima" },
    { header: "Nombre Producto", description: "Nombre del producto" },
];

export function IndexRawMaterials() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [bulkUpload, setBulkUpload] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const { page, rowsPerPage } = usePagination(searchParams);
    const [showFilters, setShowFilters] = useState(false);
    const { filters, setFilters, clearFilters } = useRawMaterialFilters();

    const { data, isLoading } = useQuery({
        queryKey: ['getRawMaterialItems', page + 1, rowsPerPage, filters],
        queryFn: () => rawMaterialProvider.getRawMaterialItems(`${rowsPerPage}`, `${page + 1}`, filters)
    });

    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <Title title="Materias Primas" subtitle="Listado de materias primas registradas" />
                <div className="flex gap-3">
                    <FiltersButton filters={filters} onClick={() => setShowFilters(true)} />
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
                        onClick={() => navigate('/items-materia-prima/crear')}
                    />
                </div>
            </div>

            <FiltersDrawer
                open={showFilters}
                close={() => setShowFilters(false)}
                fields={rawMaterialFilterFields}
                filters={filters}
                setFilters={setFilters}
                clearFilters={clearFilters}
            />

            <BulkUploadModal
                modal={bulkUpload}
                closeModal={() => setBulkUpload(false)}
                title="Carga masiva de materias primas"
                templateName="materias_primas"
                columns={bulkUploadColumns}
                upload={(file) => rawMaterialProvider.uploadFile(file)}
                onSuccess={() => queryClient.invalidateQueries({ queryKey: ['getRawMaterialItems'] })}
            />

            <section>
                <Table>
                    <Thead>
                        <Th text="Nombre del Producto" />
                        <Th text="Código" />
                        <Th text="Acciones" />
                    </Thead>

                    <Tbody>
                        {data.data.map(item => (
                            <Tr key={item.id}>
                                <Td>{item.product_name}</Td>
                                <Td>{item.code}</Td>
                                <Td className="flex gap-3">
                                    <ActionsMenu
                                        items={[
                                            { label: "Ver Detalles", icon: <EyeIcon />, onClick: () => navigate(`/items-materia-prima/${item.code}`) },
                                            { label: "Editar", icon: <EditIcon />, onClick: () => navigate(`/items-materia-prima/${item.code}/editar`) },
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
