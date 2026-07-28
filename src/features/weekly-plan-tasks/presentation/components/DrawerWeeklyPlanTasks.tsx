import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ModalAssignOperationDate, weeklyPlanTaskProvider } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { XIcon } from "lucide-react";

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
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeDrawer}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex w-full max-w-full sm:w-1/2">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-out duration-300"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in duration-200"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <Dialog.Panel className="pointer-events-auto flex h-full w-full flex-col bg-white shadow-2xl">
                                <div className="flex items-center justify-between shadow-md px-6 py-4">
                                    <Dialog.Title className="text-lg font-semibold text-gray-800">
                                        Tareas del Plan Semanal
                                    </Dialog.Title>

                                    <div className="flex items-center gap-3">
                                        {selectedTasksIds.length > 0 && (
                                            <button
                                                onClick={() => setAssignOperationDateModal(true)}
                                                className="rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-ink/90 cursor-pointer"
                                            >
                                                Asignar fecha de operación
                                            </button>
                                        )}

                                        <button
                                            onClick={closeDrawer}
                                            className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition"
                                        >
                                            <XIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6 space-y-3">
                                    {isLoading && (
                                        <div className="flex h-40 items-center justify-center">
                                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-ink" />
                                        </div>
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
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>

            <ModalAssignOperationDate
                modal={assignOperationDateModal}
                closeModal={() => setAssignOperationDateModal(false)}
                tasksIds={selectedTasksIds}
            />
        </Transition>
    )
}
