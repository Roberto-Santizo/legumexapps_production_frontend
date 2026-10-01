import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { handleDeleteQueryParam, Modal, queryParamExists, useNotification } from "@/features/shared/shared";
import { EmployeePickerForm, getAssignedEmployeeIds, toEmployeeOptions, weeklyPlanTaskEmployeeProvider, type WeeklyPlanTaskEmployeeForm } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    taskId: string;
}

export function ModalAddWeeklyPlanTaskEmployee({ taskId }: Props) {
    const location = useLocation();
    const navigate = useNavigate();
    const notification = useNotification();
    const queryClient = useQueryClient();
    const show = queryParamExists(location, 'addTaskEmployee');

    const closeModal = () => handleDeleteQueryParam(location, navigate, 'addTaskEmployee');

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

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: WeeklyPlanTaskEmployeeForm) => weeklyPlanTaskEmployeeProvider.addEmployeeByTaskId(taskId, payload),
        onSuccess: (message) => {
            notification.success(message);
            queryClient.invalidateQueries({ queryKey: ['getWeeklyPlanTaskEmployees', taskId] });
            closeModal();
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    return (
        <Modal modal={show} closeModal={closeModal} title="Agregar empleado" width="sm:max-w-lg">
            <div className="space-y-5">
                <p className="text-sm text-ink-muted">El empleado se suma a la tarea con la posición que tiene en el plan semanal, sin reemplazar a nadie.</p>

                <EmployeePickerForm
                    label="Empleado del plan"
                    submitLabel="Agregar empleado"
                    options={toEmployeeOptions(planEmployees, getAssignedEmployeeIds(assignments))}
                    isLoadingOptions={isLoading}
                    isPending={isPending}
                    onSubmit={mutate}
                />
            </div>
        </Modal>
    )
}
