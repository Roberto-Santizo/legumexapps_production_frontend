import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getQueryParam, handleDeleteQueryParam, Modal, queryParamExists, useNotification } from "@/features/shared/shared";
import { EmployeeIdentity, EmployeePickerForm, findAssignmentById, getAssignedEmployeeIds, toEmployeeOptions, weeklyPlanTaskEmployeeProvider, type WeeklyPlanTaskEmployeeForm } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    taskId: string;
}

export function ModalReplaceWeeklyPlanTaskEmployee({ taskId }: Props) {
    const location = useLocation();
    const navigate = useNavigate();
    const notification = useNotification();
    const queryClient = useQueryClient();
    const assignmentId = getQueryParam(location, 'replaceTaskEmployee');
    const show = queryParamExists(location, 'replaceTaskEmployee');

    const closeModal = () => handleDeleteQueryParam(location, navigate, 'replaceTaskEmployee');

    const { data: assignments = [] } = useQuery({
        queryKey: ['getWeeklyPlanTaskEmployees', taskId],
        queryFn: () => weeklyPlanTaskEmployeeProvider.getEmployeesByTaskId(taskId),
        enabled: show
    });

    const { data: planEmployees = [], isLoading } = useQuery({
        queryKey: ['getWeeklyPlanEmployees'],
        queryFn: () => weeklyPlanTaskEmployeeProvider.getWeeklyPlanEmployees(),
        enabled: show
    });

    const outgoing = findAssignmentById(assignments, assignmentId);

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: WeeklyPlanTaskEmployeeForm) => weeklyPlanTaskEmployeeProvider.replaceWeeklyPlanTaskEmployeeById(assignmentId!, payload),
        onSuccess: (message) => {
            notification.success(message);
            queryClient.invalidateQueries({ queryKey: ['getWeeklyPlanTaskEmployees', taskId] });
            closeModal();
        },
        onError: (err) => {
            notification.error(err.message);
            queryClient.invalidateQueries({ queryKey: ['getWeeklyPlanTaskEmployees', taskId] });
        }
    });

    return (
        <Modal modal={show} closeModal={closeModal} title="Reemplazar empleado" width="sm:max-w-lg">
            <div className="space-y-5">
                {outgoing && (
                    <div className="space-y-2">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">Sale</p>
                        <div className="rounded-lg border border-line bg-canvas/60 px-4 py-3">
                            <EmployeeIdentity name={outgoing.name} code={outgoing.code} position={outgoing.position} />
                        </div>
                        <p className="text-xs text-ink-muted">Quien entre ocupará la posición {outgoing.position} en esta tarea.</p>
                    </div>
                )}

                <EmployeePickerForm
                    label="Entra"
                    submitLabel="Reemplazar empleado"
                    options={toEmployeeOptions(planEmployees, getAssignedEmployeeIds(assignments))}
                    isLoadingOptions={isLoading}
                    isPending={isPending}
                    onSubmit={mutate}
                />
            </div>
        </Modal>
    )
}
