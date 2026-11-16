import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { handleSetQueryParam } from "@/features/shared/shared";
import { ActivitySlotsBoard, buildActivitySlots, countMissingActivities, getAssignmentActivityIds, MissingActivitiesAlert, StaffListEmpty, StaffListError, StaffListLoading, TASK_EMPLOYEE_ACTIVITY_PARAM, taskEmployeesQueryKey, useRemoveTaskEmployee, useTaskLineActivities, WeeklyPlanTaskEmployeeRow, weeklyPlanTaskEmployeeProvider } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    taskId: string;
    lineCode: string;
    editable: boolean;
}

export function WeeklyPlanTaskEmployeesRoster({ taskId, lineCode, editable }: Props) {
    const navigate = useNavigate();
    const location = useLocation();
    const { handleRemove } = useRemoveTaskEmployee(taskId);
    const activitiesQuery = useTaskLineActivities(lineCode);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: taskEmployeesQueryKey(taskId),
        queryFn: () => weeklyPlanTaskEmployeeProvider.getEmployeesByTaskId(taskId),
        retry: false
    });

    const employees = data ?? [];
    const slots = buildActivitySlots(activitiesQuery.data ?? [], getAssignmentActivityIds(employees));

    return (
        <div className="space-y-6">
            {data && employees.length > 0 && (
                <ActivitySlotsBoard
                    slots={slots}
                    isLoading={activitiesQuery.isLoading}
                    errorMessage={activitiesQuery.error?.message}
                    description="Personal activo de la tarea en cada actividad de la línea."
                />
            )}

            <MissingActivitiesAlert count={countMissingActivities(employees)} editable={editable} />

            <section className="space-y-3">
                <div className="flex items-baseline gap-3">
                    <h3 className="text-sm font-semibold text-ink">Personal asignado</h3>
                    {data && <span className="font-mono text-xs text-ink-subtle">{employees.length} empleados</span>}
                </div>

                <div className="max-h-[28rem] divide-y divide-line overflow-y-auto overscroll-contain rounded-xl border border-line bg-surface">
                    {isLoading && <StaffListLoading />}

                    {isError && <StaffListError message={error.message} />}

                    {data && employees.length === 0 && (
                        <StaffListEmpty
                            title="Sin personal asignado"
                            description="El personal aparecerá aquí cuando se confirme la asignación de la tarea."
                        />
                    )}

                    {employees.map((assignment) => (
                        <WeeklyPlanTaskEmployeeRow
                            key={assignment.id}
                            assignment={assignment}
                            editable={editable}
                            canRemove={employees.length > 1}
                            onChangeActivity={() => handleSetQueryParam(location, navigate, TASK_EMPLOYEE_ACTIVITY_PARAM, `${assignment.id}`)}
                            onRemove={() => handleRemove(assignment)}
                        />
                    ))}
                </div>
            </section>
        </div>
    )
}
