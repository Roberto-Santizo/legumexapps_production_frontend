import { ActionsMenu, handleSetQueryParam, useNotification } from "@/features/shared/shared";
import { BoxIcon, EditIcon, EyeIcon, MessageSquareIcon, TrashIcon } from "lucide-react";
import { ModalUpdateWeeklyPlanTask, weeklyPlanTaskProvider, type WeeklyPlanTask } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { StatusMessageComponent } from "@/features/weekly-plan-tasks/presentation/components/StatusMessageComponent";
import { WeeklyPlanTaskProgressMetric } from "@/features/weekly-plans/weekly-plans";

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

    const handleOnObservationAction = () => {
        handleSetQueryParam(location, navigate, 'taskObservation', `${task.id}`);
    }

    return (
        <article
            key={task.id}
            className="group rounded-xl border border-line bg-surface transition-colors duration-150 hover:border-line-strong"
        >
            <header className="flex items-start justify-between gap-3 px-4 pt-4">
                <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-ink" title={task.sku_name}>
                        {task.sku_code}  
                    </h3>
                    <p className="mt-0.5 truncate text-xs text-ink-muted">
                        {task.line_name}
                        <span className="mx-1.5 text-ink-subtle">·</span>
                        {task.destination}
                        <span className="mx-1.5 text-ink-subtle">·</span>
                        {task.sku_name}
                    </p>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                    <StatusMessageComponent message={task.status_message} status={task.status} />
                    <ActionsMenu
                        items={[
                            { label: "Ver Detalles", icon: <EyeIcon />, onClick: () => navigate(`/planes-semanales/tareas/${task.id}`) },
                            { label: "Editar", icon: <EditIcon />, onClick: () => setModal(true) },
                            { label: "Observaciones", icon: <MessageSquareIcon />, onClick: handleOnObservationAction },
                            { label: "Eliminar", icon: <TrashIcon />, onClick: handleDeleteItem, danger: true },
                        ]}
                    />
                </div>
            </header>

            <div className="flex flex-col gap-4 px-4 pb-4 pt-3 sm:flex-row sm:items-end">
                <WeeklyPlanTaskProgressMetric label="Cajas" produced={task.produced_boxes} planned={task.boxes} />
            </div>

            {task.status == 1 && (
                <footer className="flex justify-end border-t border-line bg-canvas/60 px-4 py-2 rounded-b-xl">
                    <button
                        type="button"
                        onClick={handleOnPackingMaterialAction}
                        className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-2.5 py-1 text-xs font-medium text-ink-muted transition-colors hover:border-line-strong hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20"
                    >
                        <BoxIcon className="size-3.5" />
                        Entregar Material de Empaque
                    </button>
                </footer>
            )}

            <ModalUpdateWeeklyPlanTask
                modal={modal}
                closeModal={() => setModal(false)}
                refetch={refetch}
                taskId={String(task.id)}
            />
        </article>
    );
}
