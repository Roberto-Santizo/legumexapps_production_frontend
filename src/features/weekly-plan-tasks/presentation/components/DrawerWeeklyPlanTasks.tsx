import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ModalAssignOperationDate, weeklyPlanTaskProvider } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { CustomFilledButton, Drawer, FadeInLeft } from "@/features/shared/shared";

type Props = {
    open: boolean;
    closeDrawer: () => void;
}

export function DrawerWeeklyPlanTasks({ open, closeDrawer }: Props) {
    const { id } = useParams();
    const [selectedTasksIds, setSelectedTasksIds] = useState<string[]>([]);
    const [assignOperationDateModal, setAssignOperationDateModal] = useState(false);

    const { data, isLoading } = useQuery({
        queryKey: ['getWeeklyPlanTasksDrawer', id],
        queryFn: () => weeklyPlanTaskProvider.getWeeklyPlanTasks(id!, 'true', '', ''),
        enabled: open && !!id
    });

    const toggleTaskSelection = (taskId: string) => {
        setSelectedTasksIds((prev) =>
            prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
        );
    }

    return (
        <>
            <Drawer
                drawer={open}
                closeDrawer={closeDrawer}
                title="Tareas del Plan Semanal"
                width="w-full"
            >
                <div className="space-y-10">
                    {isLoading && (
                        <div className="flex h-40 items-center justify-center">
                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-ink" />
                        </div>
                    )}

                    {selectedTasksIds.length > 0 && (
                        <FadeInLeft>
                            <CustomFilledButton
                                label="Asignar Fecha de Operación"
                                type="button"
                                onClick={() => setAssignOperationDateModal(true)}
                                fullWitdh={true}
                            />
                        </FadeInLeft>
                    )}

                    {data && data.data.length === 0 && (
                        <p className="text-sm text-ink-subtle">No hay tareas registradas para este plan semanal.</p>
                    )}

                    {data?.data.map((task) => (
                        <div key={task.id} className="flex items-start gap-3 rounded-lg border border-line p-4">
                            <input
                                type="checkbox"
                                className="mt-1 h-4 w-4 cursor-pointer"
                                checked={selectedTasksIds.includes(String(task.id))}
                                onChange={() => toggleTaskSelection(String(task.id))}
                            />

                            <div className="flex-1 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold text-ink">{task.sku_name}</span>
                                    <span className="text-md text-ink-subtle">{task.operation_date_string}</span>
                                </div>

                                <p className="text-xs text-ink-subtle">Línea: {task.line_name}</p>
                                <p className="text-xs text-ink-subtle">Destino: {task.destination}</p>

                                <div className="flex gap-4 text-xs text-ink-subtle">
                                    <span>Cajas: {task.produced_boxes ?? 0}/{task.boxes}</span>
                                    <span>Pallets: {task.produced_pallets ?? 0}/{task.pallets}</span>
                                    <span>Horas: {task.hours}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Drawer>

            <ModalAssignOperationDate
                modal={assignOperationDateModal}
                closeModal={() => setAssignOperationDateModal(false)}
                tasksIds={selectedTasksIds}
            />
        </>
    )
}
