import { ActionsMenu, handleSetQueryParam, useNotification } from "@/features/shared/shared";
import { BoxIcon, EditIcon, TrashIcon } from "lucide-react";
import { ModalUpdateWeeklyPlanTask, weeklyPlanTaskProvider, type WeeklyPlanTask } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

type Props = {
    task: WeeklyPlanTask;
    refetch: () => void;
}

export function WeeklyPlanTaskByDateComponent({ task, refetch }: Props) {
    const [modal, setModal] = useState(false);
    const notification = useNotification();
    const navigate = useNavigate();
    const location = useLocation();

    const { mutate } = useMutation({
        mutationFn: (id: string) => weeklyPlanTaskProvider.deleteWeeklyPlanTaskById(id),
        onSuccess: (message) => {
            notification.success(message);
            refetch();
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const handleDeleteItem = () => {
        notification.question('¿Desea eliminar la tarea del plan semanal?', 'Eliminar', 'La tarea se eliminará del sistema', () => mutate(String(task.id)));
    }

    const handleOnPackingMaterialAction = () => {
        handleSetQueryParam(location, navigate, 'taskId', `${task.id}`);
    }

    return (
        <div
            key={task.id}
            className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md"
        >
            <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-gray-900">
                        {task.sku_name}
                    </h3>

                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                        {task.status}
                    </span>
                </div>

                <p className="mt-1 text-xs text-gray-500">
                    {task.line_name} · {task.destination}
                </p>

                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-gray-600">
                    <p>
                        Cajas
                        <span className="ml-1 font-semibold text-gray-900">
                            {task.produced_boxes ?? 0}/{task.boxes}
                        </span>
                    </p>

                    <p>
                        Pallets
                        <span className="ml-1 font-semibold text-gray-900">
                            {task.produced_pallets ?? 0}/{task.pallets}
                        </span>
                    </p>

                    <p>
                        Horas
                        <span className="ml-1 font-semibold text-gray-900">
                            {task.hours}
                        </span>
                    </p>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center">
                <ActionsMenu
                    items={[
                        { label: "Editar", icon: <EditIcon />, onClick: () => setModal(true) },
                        { label: "Eliminar", icon: <TrashIcon />, onClick: handleDeleteItem, danger: true },
                    ]}
                />



                <button
                    type="button"
                    onClick={() => handleOnPackingMaterialAction()}
                    title="Dividir Tarea"
                    className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                    <BoxIcon className="size-7" />
                </button>
            </div>

            <ModalUpdateWeeklyPlanTask
                modal={modal}
                closeModal={() => setModal(false)}
                refetch={refetch}
                taskId={String(task.id)}
            />
        </div>
    );
}
