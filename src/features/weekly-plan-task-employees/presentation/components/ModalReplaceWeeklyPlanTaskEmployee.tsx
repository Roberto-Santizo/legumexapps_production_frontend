import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getQueryParam, handleDeleteQueryParam, Modal, queryParamExists } from "@/features/shared/shared";
import { biometricQueryProvider } from "@/features/biometric-queries/biometric-queries";
import { EmployeePickerForm, findAssignmentById, findEmployeeById, getAssignedEmployeeIds, OutgoingEmployeeCard, REPLACEMENT_LINE_CODE, toEmployeeOptions, weeklyPlanTaskEmployeeProvider, type WeeklyPlanTaskEmployeeForm } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    taskId: string;
}

export function ModalReplaceWeeklyPlanTaskEmployee({ taskId }: Props) {
    const location = useLocation();
    const navigate = useNavigate();
    const assignmentId = getQueryParam(location, 'replaceTaskEmployee');
    const show = queryParamExists(location, 'replaceTaskEmployee');

    const closeModal = () => handleDeleteQueryParam(location, navigate, 'replaceTaskEmployee');

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

    const outgoing = findAssignmentById(assignments, assignmentId);

    const { mutate, isPending } = useMutation({
        mutationFn: async (payload: WeeklyPlanTaskEmployeeForm) => console.log(findEmployeeById(replacementEmployees, payload.weekly_plan_employee_id)),
        onSuccess: () => closeModal()
    });

    return (
        <Modal modal={show} closeModal={closeModal} title="Reemplazar empleado">
            <div className="space-y-5">
                {outgoing && <OutgoingEmployeeCard name={outgoing.name} code={outgoing.code} position={outgoing.position} />}

                <EmployeePickerForm
                    label="Entra"
                    submitLabel="Reemplazar empleado"
                    options={toEmployeeOptions(replacementEmployees, getAssignedEmployeeIds(replacementEmployees, assignments))}
                    isLoadingOptions={isLoading}
                    isPending={isPending}
                    onSubmit={mutate}
                />
            </div>
        </Modal>
    )
}
