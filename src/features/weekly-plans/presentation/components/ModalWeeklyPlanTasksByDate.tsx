import { getQueryParam, handleDeleteQueryParam, Modal, queryParamExists } from "@/features/shared/shared";
import { DrawerTasksEmptyState, DrawerTasksFilters, DrawerTasksLoadingState, useDrawerTaskFilters, weeklyPlanTaskProvider } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { linesRepositoryProvider } from "@/features/lines/lines";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { WeeklyPlanTaskByDateComponent } from "@/features/weekly-plans/weekly-plans";
import { ModalCreateWeeklyPlanTaskObservation } from "@/features/weekly-plan-task-observations/weekly-plan-task-observations";

const noop = () => {};

export function ModalWeeklyPlanTasksByDate() {
    const location = useLocation();
    const navigate = useNavigate();
    const show = queryParamExists(location, 'date');
    const date = getQueryParam(location, 'date')!;
    const { filters, skuSearch, setSkuSearch, hasFilters, handleLineChange, handleClearFilters } = useDrawerTaskFilters(noop);

    const handleCloseModal = () => {
        handleClearFilters();
        handleDeleteQueryParam(location, navigate, 'date');
    }

    const { data: lines } = useQuery({
        queryKey: ['getLinesModalWeeklyPlanTasksByDate'],
        queryFn: () => linesRepositoryProvider.getLines('', ''),
        enabled: show
    });

    const { data, isLoading, isFetching, refetch } = useQuery({
        queryKey: ['getWeeklyPlanTasksByDate', date, filters],
        queryFn: () => weeklyPlanTaskProvider.getWeeklyPlanTasks('', '', { ...filters, operationDate: date }),
        enabled: !!date,
        placeholderData: keepPreviousData
    });

    const tasks = data?.data ?? [];

    return (
        <>
            <Modal modal={show} closeModal={handleCloseModal} title={`Tareas del ${date ?? ''}`}>
                <DrawerTasksFilters
                    lines={lines?.data ?? []}
                    lineId={filters.lineId}
                    skuSearch={skuSearch}
                    hasFilters={hasFilters}
                    searching={isFetching && !isLoading}
                    onLineChange={handleLineChange}
                    onSkuSearchChange={setSkuSearch}
                    onClear={handleClearFilters}
                />

                {isLoading && <DrawerTasksLoadingState />}

                {data && tasks.length === 0 && (
                    hasFilters
                        ? <DrawerTasksEmptyState filtered onClear={handleClearFilters} />
                        : <p className="text-center font-light">No existen tareas programadas</p>
                )}

                {tasks.length > 0 && (
                    <div className="space-y-3">
                        {tasks.map(task => (
                            <WeeklyPlanTaskByDateComponent key={task.id} task={task} refetch={refetch} />
                        ))}
                    </div>
                )}
            </Modal>

            <ModalCreateWeeklyPlanTaskObservation />
        </>
    )
}
