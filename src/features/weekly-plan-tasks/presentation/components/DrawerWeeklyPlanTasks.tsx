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
                <div className="flex h-full flex-col">
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

                    {data && data.data.length === 0 && (
                        <div className="flex h-60 items-center justify-center rounded-2xl border border-dashed border-gray-200">
                            <p className="text-sm text-gray-500">
                                No hay tareas registradas.
                            </p>
                        </div>
                    )}

                    <div className="space-y-4">
                        {data?.data.map((task) => {
                            const selected = selectedTasksIds.includes(String(task.id));

                            return (
                                <label
                                    key={task.id}
                                    className={`group flex cursor-pointer gap-4 rounded-2xl border bg-white p-5 transition-all duration-200
                                        ${selected
                                            ? "border-blue-500 ring-2 ring-blue-100"
                                            : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                                        }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selected}
                                        onChange={() => toggleTaskSelection(String(task.id))}
                                        className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />

                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-base font-semibold text-gray-900">
                                                    {task.sku_name}
                                                </h3>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    {task.operation_date_string}
                                                </p>
                                            </div>

                                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                                                {task.status}
                                            </span>
                                        </div>

                                        <div className="mt-5 grid grid-cols-2 gap-6">
                                            <div>
                                                <p className="text-xs uppercase tracking-wide text-gray-400">
                                                    Línea
                                                </p>

                                                <p className="mt-1 font-medium text-gray-800">
                                                    {task.line_name}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs uppercase tracking-wide text-gray-400">
                                                    Destino
                                                </p>

                                                <p className="mt-1 font-medium text-gray-800">
                                                    {task.destination}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-6 grid grid-cols-3 gap-3">
                                            <div className="rounded-xl bg-gray-50 p-4">
                                                <p className="text-xs text-gray-500">
                                                    Cajas
                                                </p>

                                                <p className="mt-2 text-xl font-semibold text-gray-900">
                                                    {task.produced_boxes ?? 0}

                                                    <span className="ml-1 text-sm font-normal text-gray-400">
                                                        / {task.boxes}
                                                    </span>
                                                </p>
                                            </div>

                                            <div className="rounded-xl bg-gray-50 p-4">
                                                <p className="text-xs text-gray-500">
                                                    Pallets
                                                </p>

                                                <p className="mt-2 text-xl font-semibold text-gray-900">
                                                    {task.produced_pallets ?? 0}

                                                    <span className="ml-1 text-sm font-normal text-gray-400">
                                                        / {task.pallets}
                                                    </span>
                                                </p>
                                            </div>

                                            <div className="rounded-xl bg-gray-50 p-4">
                                                <p className="text-xs text-gray-500">
                                                    Horas
                                                </p>

                                                <p className="mt-2 text-xl font-semibold text-gray-900">
                                                    {task.hours}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            );
                        })}
                    </div>
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
