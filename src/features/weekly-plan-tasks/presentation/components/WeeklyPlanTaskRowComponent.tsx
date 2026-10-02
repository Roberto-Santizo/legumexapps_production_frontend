import { ActionsMenu, formatNumber, handleSetQueryParam } from "@/features/shared/shared";
import { EyeIcon, PersonStandingIcon, PlayIcon, StopCircleIcon, TableIcon } from "lucide-react";
import { InformationField } from "@/features/shared/shared";
import { ModalEndWeeklyPlanTask, ModalUpdateWeeklyPlanTask, StatusMessageComponent, useStartWeeklyPlanTask, type WeeklyPlanTask } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { RecordedPoundsLabel } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

type Props = {
    task: WeeklyPlanTask;
    refetch: () => void;
}


export function WeeklyPlanTaskRowComponent({ task, refetch }: Props) {
    const [modal, setModal] = useState(false);
    const [endModal, setEndModal] = useState(false);
    const { handleStartTask } = useStartWeeklyPlanTask(refetch);
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <article
            className={`grid gap-5 border-l-[3px] px-5 py-5 transition-colors motion-reduce:transition-none sm:grid-cols-[minmax(0,1fr)_13rem_auto] sm:items-center sm:gap-8 `}
        >
            <div className="min-w-0">
                <div className="flex justify-between items-center">

                    <h3 className="truncate text-base font-semibold leading-tight tracking-tight text-ink" title={task.sku_name}>
                        {task.sku_name}
                    </h3>

                    <StatusMessageComponent message={task.status_message} status={task.status} />
                </div>
                
                <dl className="mt-3 grid grid-cols-2 gap-x-8 gap-y-3">
                    <InformationField label="Código" value={task.sku_code} mono />
                    <InformationField label="Cajas" value={formatNumber(task.boxes)} mono />
                    <InformationField label="Cliente" value={task.sku_client} />
                    <InformationField label="Destino" value={task.destination} />
                </dl>
            </div>

            <div className="sm:text-right">
                <p className="mt-2 font-mono text-xs tabular-nums text-ink-muted">
                    {formatNumber(task.produced_boxes)}
                    <span className="text-ink-subtle"> / {formatNumber(task.boxes)} cajas</span>
                </p>

                {(task.status == 4 || task.recorded_pounds > 0) && (
                    <RecordedPoundsLabel recorded={task.recorded_pounds} planned={task.planned_pounds} />
                )}

            </div>

            <div className="flex items-center gap-1 justify-self-end">
                {task.status == 2 && (
                    <ActionsMenu
                        items={[
                            { label: "Asignar Personal", icon: <PersonStandingIcon />, onClick: () => navigate(`/planes-semanales/tareas/asignar-personal/${task.id}`) },
                        ]}
                    />
                )}

                {task.status == 3 && (
                    <ActionsMenu
                        items={[
                            { label: "Ver Asignaciones", icon: <EyeIcon />, onClick: () => navigate(`/planes-semanales/tareas/asignar-personal/${task.id}`) },
                            { label: "Iniciar Tarea", icon: <PlayIcon />, onClick: () => handleStartTask(String(task.id)) },
                        ]}
                    />
                )}

                {task.status == 4 && (
                    <ActionsMenu
                        items={[
                            { label: "Ver Detalles", icon: <EyeIcon />, onClick: () => navigate(`/planes-semanales/tareas/${task.id}`) },
                            { label: "Rendimiento", icon: <TableIcon />, onClick: () => handleSetQueryParam(location, navigate, 'taskPerformance', String(task.id)) },
                            { label: "Cerrar Tarea", icon: <StopCircleIcon />, onClick: () => setEndModal(true) },
                        ]}
                    />
                )}

            </div>

            <ModalUpdateWeeklyPlanTask
                modal={modal}
                closeModal={() => setModal(false)}
                refetch={refetch}
                taskId={String(task.id)}
            />

            {task.status == 4 && (
                <ModalEndWeeklyPlanTask
                    modal={endModal}
                    closeModal={() => setEndModal(false)}
                    refetch={refetch}
                    task={task}
                />
            )}
        </article>
    )
}
