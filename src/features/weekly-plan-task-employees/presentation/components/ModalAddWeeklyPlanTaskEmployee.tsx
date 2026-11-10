import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { handleDeleteQueryParam, Modal, queryParamExists } from "@/features/shared/shared";
import { biometricQueryProvider } from "@/features/biometric-queries/biometric-queries";
import { EmployeePickerForm, findEmployeeById, getAssignedEmployeeIds, REPLACEMENT_LINE_CODE, toEmployeeOptions, weeklyPlanTaskEmployeeProvider, type WeeklyPlanTaskEmployeeForm } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    taskId: string;
}

export function ModalAddWeeklyPlanTaskEmployee({ taskId }: Props) {
    const location = useLocation();
    const navigate = useNavigate();
    const show = queryParamExists(location, 'addTaskEmployee');

    const closeModal = () => handleDeleteQueryParam(location, navigate, 'addTaskEmployee');

    const { data: assignments = [] } = useQuery({
        queryKey: ['getWeeklyPlanTaskEmployees', taskId],
        queryFn: () => weeklyPlanTaskEmployeeProvider.getEmployeesByTaskId(taskId),
        enabled: show
    });

    const { data: replacementEmployees = [], isLoading } = useQuery({
        queryKey: ['getBiometricEmployeesByLineCode', REPLACEMENT_LINE_CODE],
        queryFn: () => biometricQueryProvider.getEmployeesByLineCode(REPLACEMENT_LINE_CODE),
        enabled: show
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (payload: WeeklyPlanTaskEmployeeForm) => console.log(findEmployeeById(replacementEmployees, payload.weekly_plan_employee_id)),
        onSuccess: () => closeModal()
    });

    return (
        <Modal modal={show} closeModal={closeModal} title="Agregar empleado" width="sm:max-w-xl">
            <div className="space-y-5">
                <p className="text-sm text-ink-muted">El empleado se suma a la tarea con la posición que tiene en el plan semanal, sin reemplazar a nadie.</p>

                <EmployeePickerForm
                    label="Empleado del plan"
                    submitLabel="Agregar empleado"
                    options={toEmployeeOptions(replacementEmployees, getAssignedEmployeeIds(replacementEmployees, assignments))}
                    isLoadingOptions={isLoading}
                    isPending={isPending}
                    onSubmit={mutate}
                />
            </div>
        </Modal>
    )
}
