import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { weeklyPlanTaskProvider } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { XIcon } from "lucide-react";

type Props = {
    open: boolean;
    closeDrawer: () => void;
}

export function DrawerWeeklyPlanTasks({ open, closeDrawer }: Props) {
    const { id } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ['getWeeklyPlanTasksDrawer', id],
        queryFn: () => weeklyPlanTaskProvider.getWeeklyPlanTasks(id!, '', ''),
        enabled: open && !!id
    });

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

                                    <button
                                        onClick={closeDrawer}
                                        className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition"
                                    >
                                        <XIcon className="h-5 w-5" />
                                    </button>
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
                                        <div key={task.id} className="rounded-lg border border-line p-4 space-y-2">
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
                                    ))}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
