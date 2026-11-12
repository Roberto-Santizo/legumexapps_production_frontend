import { CustomFilledButton, ErrorComponent, FiltersButton, FiltersDrawer, LoadingData, Pagination, Table, Tbody, Th, Thead, Title, usePagination } from "@/features/shared/shared";
import { ActivityRow, activitiesQueryKey, activityFilterFields, activityProvider, useActivityFilters, useDeleteActivity } from "@/features/activities/activities";
import { PlusIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function IndexActivities() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { page, rowsPerPage } = usePagination(searchParams);
    const [showFilters, setShowFilters] = useState(false);
    const { filters, setFilters, clearFilters } = useActivityFilters();
    const { handleDeleteActivity } = useDeleteActivity();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: [...activitiesQueryKey, page + 1, rowsPerPage, filters],
        queryFn: () => activityProvider.getActivities(`${rowsPerPage}`, `${page + 1}`, filters),
        retry: false
    });

    if (isLoading) return <LoadingData />
    if (isError) return <ErrorComponent message={error.message} />
    if (data) return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <Title title="Actividades" subtitle="Catálogo de actividades que las líneas usan para definir su dotación" />
                <div className="flex gap-3">
                    <FiltersButton filters={filters} onClick={() => setShowFilters(true)} />
                    <CustomFilledButton
                        label="Crear Actividad"
                        type="button"
                        icon={<PlusIcon />}
                        onClick={() => navigate('/actividades/crear')}
                    />
                </div>
            </div>

            <FiltersDrawer
                open={showFilters}
                close={() => setShowFilters(false)}
                fields={activityFilterFields}
                filters={filters}
                setFilters={setFilters}
                clearFilters={clearFilters}
            />

            <section>
                <Table>
                    <Thead>
                        <Th text="Actividad" />
                        <Th text="Unidad de medida" />
                        <Th text="Acciones" />
                    </Thead>

                    <Tbody>
                        {data.data.map(activity => (
                            <ActivityRow
                                key={activity.id}
                                activity={activity}
                                onShow={(item) => navigate(`/actividades/${item.id}`)}
                                onEdit={(item) => navigate(`/actividades/${item.id}/editar`)}
                                onDelete={handleDeleteActivity}
                            />
                        ))}
                    </Tbody>
                </Table>

                {data.data.length === 0 && (
                    <p className="py-10 text-center text-sm text-ink-muted">No hay actividades registradas.</p>
                )}
            </section>

            <Pagination
                count={data.total ?? data.data.length}
                page={page}
                rowsPerPage={rowsPerPage}
                setSearchParams={setSearchParams}
            />
        </div>
    )
}
