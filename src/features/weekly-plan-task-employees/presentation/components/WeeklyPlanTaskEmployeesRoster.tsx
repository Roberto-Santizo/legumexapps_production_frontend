import { useQuery } from "@tanstack/react-query";
import { buildActivitySlots, buildRosterBoardCards, countMissingActivities, findAssignmentByKey, findPendingKey, getCardActivityIds, MissingActivitiesAlert, StaffActivityBoard, StaffListEmpty, StaffListError, StaffListLoading, taskEmployeesQueryKey, useRemoveTaskEmployee, useTaskLineActivities, useUpdateTaskEmployeeActivity, weeklyPlanTaskEmployeeProvider, type BoardTarget } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    taskId: string;
    lineCode: string;
    editable: boolean;
}

export function WeeklyPlanTaskEmployeesRoster({ taskId, lineCode, editable }: Props) {
    const { handleRemove } = useRemoveTaskEmployee(taskId);
    const { updateActivity, pendingMove } = useUpdateTaskEmployeeActivity(taskId);
    const activitiesQuery = useTaskLineActivities(lineCode);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: taskEmployeesQueryKey(taskId),
        queryFn: () => weeklyPlanTaskEmployeeProvider.getEmployeesByTaskId(taskId),
        retry: false
    });

    const employees = data ?? [];
    const cards = buildRosterBoardCards(employees, pendingMove);
    const slots = buildActivitySlots(activitiesQuery.data ?? [], getCardActivityIds(cards));
    const missing = countMissingActivities(employees);

    const handleMove = (key: string, target: BoardTarget) => {
        if (target !== null) updateActivity(Number(key), target);
    };

    const handleRemoveCard = (key: string) => {
        const assignment = findAssignmentByKey(employees, key);
        if (assignment) handleRemove(assignment);
    };

    if (isLoading || isError || employees.length === 0) {
        return (
            <div className="overflow-hidden rounded-xl border border-line bg-surface">
                {isLoading && <StaffListLoading />}
                {isError && <StaffListError message={error.message} />}
                {data && (
                    <StaffListEmpty
                        title="Sin personal asignado"
                        description="El personal aparecerá aquí cuando se confirme la asignación de la tarea."
                    />
                )}
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <MissingActivitiesAlert count={missing} editable={editable} />

            <StaffActivityBoard
                slots={slots}
                cards={cards}
                isLoading={activitiesQuery.isLoading}
                errorMessage={activitiesQuery.error?.message}
                description={editable
                    ? 'Arrastra a un empleado a un lugar libre de otra actividad para cambiarla. En pantallas táctiles, tócalo y luego toca el lugar.'
                    : 'Personal de la tarea en cada actividad de la línea.'}
                poolTitle="Sin actividad"
                poolDescription="Asignados antes de las actividades por línea."
                showPool={missing > 0}
                readonly={!editable}
                pendingKey={findPendingKey(pendingMove)}
                onMove={handleMove}
                onRemove={employees.length > 1 ? handleRemoveCard : undefined}
            />
        </div>
    )
}
