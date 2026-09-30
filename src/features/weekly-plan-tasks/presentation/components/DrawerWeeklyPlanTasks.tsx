import { Drawer } from "@/features/shared/shared";
import { DrawerTasksEmptyState, DrawerTasksFilters, DrawerTasksLoadingState, groupTasksByLine, ModalAssignOperationDate, ModalSplitWeeklyPlanTask, sumSelectedTaskHours, useDrawerTaskFilters, useTaskSelection, weeklyPlanTaskProvider, WeeklyPlanTaskLineGroup, WeeklyPlanTasksSelectionBar, type WeeklyPlanTask } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { linesRepositoryProvider } from "@/features/lines/lines";
import { useParams } from "react-router-dom";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type Props = {
    open: boolean;
    closeDrawer: () => void;
}

export function DrawerWeeklyPlanTasks({ open, closeDrawer }: Props) {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const [assignOperationDateModal, setAssignOperationDateModal] = useState(false);
    const [taskToSplit, setTaskToSplit] = useState<WeeklyPlanTask | null>(null);
    const { selectedTasksIds, toggleTaskSelection, setGroupSelection, clearSelection } = useTaskSelection();
    const { filters, skuSearch, setSkuSearch, hasFilters, handleLineChange, handleClearFilters } = useDrawerTaskFilters(clearSelection);

    const { data: lines } = useQuery({
        queryKey: ['getLinesDrawerWeeklyPlanTasks'],
        queryFn: () => linesRepositoryProvider.getLines('', ''),
        enabled: open
    });

    const { data, isLoading, isFetching, refetch } = useQuery({
        queryKey: ['getWeeklyPlanTasksDrawer', id, filters],
        queryFn: () => weeklyPlanTaskProvider.getWeeklyPlanTasks('', '', { ...filters, weeklyPlanId: id!, noOperationDate: 'true' }),
        enabled: open && !!id,
        placeholderData: keepPreviousData
    });

    const tasks = data?.data ?? [];
    const groups = groupTasksByLine(tasks);
    const selectedHours = sumSelectedTaskHours(tasks, selectedTasksIds);

    const callback = () => {
        clearSelection();
        queryClient.invalidateQueries({ queryKey: ['getWeeklyPlanTasksForCalendarById', id] });
        refetch();
    }

    return (
        <>
            <Drawer
                drawer={open}
                closeDrawer={closeDrawer}
                title="Tareas sin programar"
                width="sm:max-w-2xl"
            >
                <div className="flex min-h-full flex-col">
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

                    {data && tasks.length === 0 && <DrawerTasksEmptyState filtered={hasFilters} onClear={handleClearFilters} />}

                    {tasks.length > 0 && (
                        <>
                            <div className="flex-1 space-y-8">
                                {groups.map((group) => (
                                    <WeeklyPlanTaskLineGroup
                                        key={group.line}
                                        group={group}
                                        selectedTasksIds={selectedTasksIds}
                                        toggleTaskSelection={toggleTaskSelection}
                                        setGroupSelection={setGroupSelection}
                                        onSplitTask={setTaskToSplit}
                                    />
                                ))}
                            </div>

                            <WeeklyPlanTasksSelectionBar
                                selectedCount={selectedTasksIds.length}
                                selectedHours={selectedHours}
                                onClear={clearSelection}
                                onAssignDate={() => setAssignOperationDateModal(true)}
                            />
                        </>
                    )}
                </div>
            </Drawer>

            <ModalAssignOperationDate
                modal={assignOperationDateModal}
                closeModal={() => setAssignOperationDateModal(false)}
                tasksIds={selectedTasksIds}
                callback={callback}
            />

            <ModalSplitWeeklyPlanTask
                modal={!!taskToSplit}
                closeModal={() => setTaskToSplit(null)}
                task={taskToSplit}
                callback={callback}
            />
        </>
    )
}
