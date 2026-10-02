import { CustomFilledButton, FiltersButton, FiltersDrawer, Loading, Pagination, Title, useNotification, usePagination } from "@/features/shared/shared";
import { ModalUploadWeeklyPlanEmployees, WeeklyPlanEmployeesTable, useWeeklyPlanEmployeeFilters, weeklyPlanEmployeeFilterFields, weeklyPlanEmployeeProvider } from "@/features/weekly-plan-employees/weekly-plan-employees";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PlusIcon, UploadIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

export function IndexWeeklyPlanEmployees() {
    const navigate = useNavigate();
    const notification = useNotification();
    const queryClient = useQueryClient();
    const [bulkUpload, setBulkUpload] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const { page, rowsPerPage } = usePagination(searchParams);
    const [showFilters, setShowFilters] = useState(false);
    const { filters, setFilters, clearFilters } = useWeeklyPlanEmployeeFilters();

    const { data, isLoading } = useQuery({
        queryKey: ['getWeeklyPlanEmployees', page + 1, rowsPerPage, filters],
        queryFn: () => weeklyPlanEmployeeProvider.getWeeklyPlanEmployees(`${rowsPerPage}`, `${page + 1}`, filters)
    });

    const refreshList = () => queryClient.invalidateQueries({ queryKey: ['getWeeklyPlanEmployees'] });

    const { mutate } = useMutation({
        mutationFn: (id: string) => weeklyPlanEmployeeProvider.deleteWeeklyPlanEmployeeById(id),
        onSuccess: (message) => {
            notification.success(message);
            refreshList();
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const handleDelete = (id: number) => notification.question('¿Desea eliminar al empleado del plan?', 'Eliminar', 'El empleado dejará de estar asignado a su posición en este plan semanal', () => mutate(`${id}`));

    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <Title title="Empleados por Plan Semanal" subtitle="Asignación de empleados a posiciones en cada plan semanal" />
                <div className="flex gap-3">
                    <FiltersButton filters={filters} onClick={() => setShowFilters(true)} />
                    <CustomFilledButton
                        label="Carga Masiva"
                        type="button"
                        icon={<UploadIcon />}
                        onClick={() => setBulkUpload(true)}
                    />
                    <CustomFilledButton
                        label="Asignar Empleado"
                        type="button"
                        icon={<PlusIcon />}
                        onClick={() => navigate('/empleados-planes-semanales/crear')}
                    />
                </div>
            </div>

            <FiltersDrawer
                open={showFilters}
                close={() => setShowFilters(false)}
                fields={weeklyPlanEmployeeFilterFields}
                filters={filters}
                setFilters={setFilters}
                clearFilters={clearFilters}
            />

            <ModalUploadWeeklyPlanEmployees
                modal={bulkUpload}
                closeModal={() => setBulkUpload(false)}
                onSuccess={refreshList}
            />

            <section>
                <WeeklyPlanEmployeesTable
                    items={data.data}
                    onShow={(id) => navigate(`/empleados-planes-semanales/${id}`)}
                    onEdit={(id) => navigate(`/empleados-planes-semanales/${id}/editar`)}
                    onDelete={handleDelete}
                />
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
