import { CustomFilledButton, ErrorComponent, FiltersButton, FiltersDrawer, LoadingData, Pagination, Table, Tbody, Th, Thead, Title, usePagination } from "@/features/shared/shared";
import { CaptureFieldRow, captureFieldFilterFields, captureFieldsProvider, useCaptureFieldFilters, useDeleteCaptureField } from "@/features/capture-fields/capture-fields";
import { PlusIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function IndexCaptureFields() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { page, rowsPerPage } = usePagination(searchParams);
    const [showFilters, setShowFilters] = useState(false);
    const { filters, setFilters, clearFilters } = useCaptureFieldFilters();
    const { handleDeleteCaptureField } = useDeleteCaptureField();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['getCaptureFields', page + 1, rowsPerPage, filters],
        queryFn: () => captureFieldsProvider.getCaptureFields(`${rowsPerPage}`, `${page + 1}`, filters),
        retry: false
    });

    if (isLoading) return <LoadingData />
    if (isError) return <ErrorComponent message={error.message} />
    if (data) return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <Title title="Campos de Captura" subtitle="Catálogo de datos que las líneas pueden registrar" />
                <div className="flex gap-3">
                    <FiltersButton filters={filters} onClick={() => setShowFilters(true)} />
                    <CustomFilledButton
                        label="Crear Campo"
                        type="button"
                        icon={<PlusIcon />}
                        onClick={() => navigate('/campos-captura/crear')}
                    />
                </div>
            </div>

            <FiltersDrawer
                open={showFilters}
                close={() => setShowFilters(false)}
                fields={captureFieldFilterFields}
                filters={filters}
                setFilters={setFilters}
                clearFilters={clearFilters}
            />

            <section>
                <Table>
                    <Thead>
                        <Th text="Campo" />
                        <Th text="Tipo" />
                        <Th text="Calculado con" />
                        <Th text="Uso" />
                        <Th text="Acciones" />
                    </Thead>

                    <Tbody>
                        {data.data.map(field => (
                            <CaptureFieldRow
                                key={field.id}
                                field={field}
                                onShow={(item) => navigate(`/campos-captura/${item.id}`)}
                                onEdit={(item) => navigate(`/campos-captura/${item.id}/editar`)}
                                onDelete={handleDeleteCaptureField}
                            />
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
