import { CustomFilledButton, Drawer, FadeInLeft } from "@/features/shared/shared";
import { ModalAssignOperationDate, ModalSplitWeeklyPlanTask, weeklyPlanTaskProvider, type WeeklyPlanTask } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { WeeklyPlanTaskDrawerComponent } from "@/features/weekly-plans/weekly-plans";
import { AnimatePresence } from "framer-motion";

type Props = {
    open: boolean;
    closeDrawer: () => void;
}

export function DrawerWeeklyPlanTasks({ open, closeDrawer }: Props) {
    const { id } = useParams();
    const [selectedTasksIds, setSelectedTasksIds] = useState<string[]>([]);
    const [assignOperationDateModal, setAssignOperationDateModal] = useState(false);
    const [taskToSplit, setTaskToSplit] = useState<WeeklyPlanTask | null>(null);
    const queryClient = useQueryClient();

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['getWeeklyPlanTasksDrawer', id],
        queryFn: () => weeklyPlanTaskProvider.getWeeklyPlanTasks(id!, 'true', '', '', ''),
        enabled: open && !!id
    });

    const toggleTaskSelection = (taskId: string) => {
        setSelectedTasksIds((prev) =>
            prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
        );
    }

    const onCloseModal = () => setAssignOperationDateModal(false);

    const onCloseSplitModal = () => setTaskToSplit(null);

    const callback = () => {
        setSelectedTasksIds([]);
        queryClient.invalidateQueries({ queryKey: ['getWeeklyPlanTasksForCalendarById', id] });
        refetch();
    }

    if (data) return (
        <>
            <Drawer
                drawer={open}
                closeDrawer={closeDrawer}
                title="Tareas del Plan Semanal"
                width="w-full"
            >
                <div className="flex h-full flex-col w-2xl">
                    {selectedTasksIds.length > 0 && (
                        <FadeInLeft>
                            <div className="sticky top-0 z-10 mb-6 rounded-2xl border border-blue-100 bg-white/90 p-3 shadow-sm backdrop-blur">
                                <CustomFilledButton
                                    label={`Asignar Fecha de Operación (${selectedTasksIds.length})`}
                                    type="button"
                                    onClick={() => setAssignOperationDateModal(true)}
                                    fullWitdh
                                />
                            </div>
                        </FadeInLeft>
                    )}

                    {isLoading && (
                        <div className="flex h-60 items-center justify-center">
                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900" />
                        </div>
                    )}

                    {data.data.length === 0 && (
                        <div className="flex h-60 items-center justify-center rounded-2xl border border-dashed border-gray-200">
                            <p className="text-sm text-gray-500">
                                No hay tareas registradas.
                            </p>
                        </div>
                    )}

                    <div className="space-y-4">
                        <AnimatePresence>
                            {data.data.map(task => (
                                <FadeInLeft key={task.id}>
                                    <WeeklyPlanTaskDrawerComponent
                                        task={task}
                                        toggleTaskSelection={toggleTaskSelection}
                                        selectedTasksIds={selectedTasksIds}
                                        onSplitTask={setTaskToSplit}
                                    />
                                </FadeInLeft>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </Drawer>

            <ModalAssignOperationDate
                modal={assignOperationDateModal}
                closeModal={() => onCloseModal()}
                tasksIds={selectedTasksIds}
                callback={() => callback()}
            />

            <ModalSplitWeeklyPlanTask
                modal={!!taskToSplit}
                closeModal={onCloseSplitModal}
                task={taskToSplit}
                callback={() => callback()}
            />
        </>
    )
}
