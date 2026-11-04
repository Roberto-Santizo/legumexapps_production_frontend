import { FiltersButton, FiltersDrawer, BulkUploadModal, type BulkUploadColumn, ActionsMenu, CustomFilledButton, ErrorComponent, LoadingData, Pagination, Table, Tbody, Td, Th, Thead, Title, Tr, usePagination } from "@/features/shared/shared";
import { EditIcon, EyeIcon, PlusIcon, UploadIcon } from "lucide-react";
import { linesRepositoryProvider, useLineFilters, lineFilterFields } from "@/features/lines/lines";
import { captureTypeLabels } from "@/features/capture-fields/capture-fields";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const bulkUploadColumns: BulkUploadColumn[] = [
    { header: "Nombre", description: "Nombre de la línea" },
    { header: "Código", description: "Código único de la línea" },
    { header: "Turno", description: "Número entero" },
];

export function IndexLines() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [bulkUpload, setBulkUpload] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const { page, rowsPerPage } = usePagination(searchParams);
    const [showFilters, setShowFilters] = useState(false);
    const { filters, setFilters, clearFilters } = useLineFilters();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['getLines', rowsPerPage, page, filters],
        queryFn: () => linesRepositoryProvider.getLines(`${rowsPerPage}`, `${page + 1}`, '', filters),
        retry: false
    });

    if (isLoading) return <LoadingData />
    if (isError) return <ErrorComponent message={error.message} />
    if (data) return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">

                <Title title="Líneas" subtitle="Listado de líneas registradas" />
                <div className="flex gap-3">
                    <FiltersButton filters={filters} onClick={() => setShowFilters(true)} />
                    <CustomFilledButton
                        label="Carga Masiva"
                        type="button"
                        icon={<UploadIcon />}
                        onClick={() => setBulkUpload(true)}
                    />
                    <CustomFilledButton
                        label="Crear Línea"
                        type="button"
                        icon={<PlusIcon />}
                        onClick={() => navigate('/lineas/crear')}
                    />
                </div>
            </div>

            <FiltersDrawer
                open={showFilters}
                close={() => setShowFilters(false)}
                fields={lineFilterFields}
                filters={filters}
                setFilters={setFilters}
                clearFilters={clearFilters}
            />

            <BulkUploadModal
                modal={bulkUpload}
                closeModal={() => setBulkUpload(false)}
                title="Carga masiva de líneas"
                templateName="lineas"
                columns={bulkUploadColumns}
                upload={(file) => linesRepositoryProvider.uploadFile(file)}
                onSuccess={() => queryClient.invalidateQueries({ queryKey: ['getLines'] })}
            />

            <section>
                <Table>
                    <Thead>
                        <Th text="Linea" />
                        <Th text="Código" />
                        <Th text="Familia" />
                        <Th text="Acciones" />
                    </Thead>

                    <Tbody>
                        {data.data.map(line => (
                            <Tr>
                                <Td>{line.name}</Td>
                                <Td>{line.code}</Td>
                                <Td>{captureTypeLabels[line.capture_type]}</Td>
                                <Td className="flex gap-3">
                                    <ActionsMenu
                                        items={[
                                            { label: "Ver Detalles", icon: <EyeIcon />, onClick: () => navigate(`/lineas/${line.code}`) },
                                            { label: "Editar", icon: <EditIcon />, onClick: () => navigate(`/lineas/${line.code}/editar`) },
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
