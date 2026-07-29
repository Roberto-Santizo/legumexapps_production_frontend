import { ClipboardList, EditIcon, PlusIcon, TrashIcon } from "lucide-react";
import { ActionsMenu, CustomFilledButton, useNotification } from "@/features/shared/shared";
import { draftWeeklyPlanTaskProvider, ModalCreateDraftWeeklyPlanTask, ModalUpdateDraftWeeklyPlanTask } from "@/features/draft-weekly-plan-tasks/draft-weekly-plan-tasks";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function DraftWeeklyPlanTasksSidebar() {
    const { id } = useParams();
    const notification = useNotification();
    const [taskId, setTaskId] = useState('');
    const [createModal, setCreateModal] = useState(false);
    const queryClient = useQueryClient();

    const refetchHoursPerLine = () => queryClient.invalidateQueries({ queryKey: ['getHoursPerLineByDraftWeeklyPlanId', id] });

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['getDraftWeeklyPlanTasksSidebar', id],
        queryFn: () => draftWeeklyPlanTaskProvider.getDraftWeeklyPlanTasks(id!, '', '')
    });

    const { mutate } = useMutation({
        mutationFn: (id: string) => draftWeeklyPlanTaskProvider.deleteDraftWeeklyPlanTaskById(id),
        onSuccess: (message) => {
            notification.success(message);
            refetchHoursPerLine();
            refetch();
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const handleDeleteTask = (id: string) => notification.question('¿Desea eliminar la tarea?', 'Eliminar', 'La tarea se eliminará del sistema', () => mutate(id));

    const closeUpdateModal = () => setTaskId('');

    return (
        <aside className="flex w-full max-h-screen shrink-0 flex-col space-y-3 lg:w-80 shadow-xl p-5">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-ink">Tareas</h3>
                <CustomFilledButton
                    label="Crear"
                    type="button"
                    icon={<PlusIcon />}
                    onClick={() => setCreateModal(true)}
                />
            </div>

            <div className="space-y-3 overflow-y-auto">
                {isLoading && (
                    <div className="flex h-40 items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-ink" />
                    </div>
                )}

                {data && data.data.length === 0 && (
                    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line bg-surface py-10 text-center">
                        <ClipboardList className="size-6 text-ink-subtle" />
                        <p className="text-sm text-ink-muted">No hay tareas registradas para este plan semanal</p>
                    </div>
                )}

                {data?.data.map(task => (
                    <div key={task.id} className="space-y-2 rounded-lg border border-line p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-ink">{task.sku_name}</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-ink-subtle">{task.operation_date_string}</span>
                                <ActionsMenu
                                    items={[
                                        { label: "Editar", icon: <EditIcon />, onClick: () => setTaskId(`${task.id}`), danger: false },
                                        { label: "Eliminar", icon: <TrashIcon />, onClick: () => handleDeleteTask(`${task.id}`), danger: true },
                                    ]}
                                />
                            </div>
                        </div>

                        <p className="text-xs text-ink-subtle">Línea: {task.line_name ?? '-'}</p>
                        <p className="text-xs text-ink-subtle">Destino: {task.destination}</p>

                        <div className="flex gap-4 text-xs text-ink-subtle">
                            <span>Cajas: {task.boxes}</span>
                            <span>Horas: {task.hours}</span>
                        </div>
                    </div>
                ))}
            </div>

            <ModalCreateDraftWeeklyPlanTask
                modal={createModal}
                closeModal={() => setCreateModal(false)}
                refetch={refetch}
                callback={() => refetchHoursPerLine()}
            />

            <ModalUpdateDraftWeeklyPlanTask
                modal={!!taskId}
                closeModal={closeUpdateModal}
                refetch={refetch}
                taskId={taskId}
                callback={() => refetchHoursPerLine()}
            />
        </aside>
    )
}
