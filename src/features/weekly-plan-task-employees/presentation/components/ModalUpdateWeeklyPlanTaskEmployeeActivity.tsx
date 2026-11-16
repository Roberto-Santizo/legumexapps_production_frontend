import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getQueryParam, handleDeleteQueryParam, Modal, queryParamExists } from "@/features/shared/shared";
import { ActivityPickerForm, buildActivitySlots, EmployeeIdentity, findAssignmentById, getAssignmentActivityIds, StaffListLoading, TASK_EMPLOYEE_ACTIVITY_PARAM, taskEmployeesQueryKey, toActivityOptions, useTaskLineActivities, useUpdateTaskEmployeeActivity, weeklyPlanTaskEmployeeProvider } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    taskId: string;
    lineCode: string;
}

export function ModalUpdateWeeklyPlanTaskEmployeeActivity({ taskId, lineCode }: Props) {
    const location = useLocation();
    const navigate = useNavigate();
    const assignmentId = getQueryParam(location, TASK_EMPLOYEE_ACTIVITY_PARAM);
    const show = queryParamExists(location, TASK_EMPLOYEE_ACTIVITY_PARAM);

    const closeModal = () => handleDeleteQueryParam(location, navigate, TASK_EMPLOYEE_ACTIVITY_PARAM);

    const { data: assignments = [] } = useQuery({
        queryKey: taskEmployeesQueryKey(taskId),
        queryFn: () => weeklyPlanTaskEmployeeProvider.getEmployeesByTaskId(taskId),
        enabled: show
    });

    const activitiesQuery = useTaskLineActivities(lineCode);
    const { updateActivity, isUpdating } = useUpdateTaskEmployeeActivity({ taskId, onSuccess: closeModal });

    const assignment = findAssignmentById(assignments, assignmentId);
    const slots = assignment ? buildActivitySlots(activitiesQuery.data ?? [], getAssignmentActivityIds(assignments, assignment.id)) : [];

    return (
        <Modal modal={show} closeModal={closeModal} title={assignment?.line_activity_id === null ? 'Asignar actividad' : 'Cambiar actividad'} width="sm:max-w-xl">
            <div className="space-y-5">
                {assignment && (
                    <div className="rounded-lg border border-line bg-canvas/60 px-3 py-3">
                        <EmployeeIdentity name={assignment.name} code={assignment.code} position={assignment.position} />
                    </div>
                )}

                {activitiesQuery.isLoading && <StaffListLoading />}

                {activitiesQuery.isError && <p className="text-sm text-ink-muted">{activitiesQuery.error.message}</p>}

                {assignment && activitiesQuery.data && (
                    <ActivityPickerForm
                        key={assignment.id}
                        options={toActivityOptions(slots, assignment.line_activity_id)}
                        currentId={assignment.line_activity_id}
                        isPending={isUpdating}
                        onSubmit={(lineActivityId) => updateActivity(assignment.id, lineActivityId)}
                    />
                )}
            </div>
        </Modal>
    )
}
