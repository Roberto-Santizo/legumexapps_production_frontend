import { useQuery } from "@tanstack/react-query";
import { FadeSwitch } from "@/features/shared/shared";
import { buildActivitySlots, buildRosterBoardCards, countMissingActivities, findAssignmentByKey, getPendingKeys, getCardActivityIds, getRosterView, MissingActivitiesAlert, StaffActivityBoard, StaffListEmpty, StaffListError, StaffListLoading, taskEmployeesQueryKey, useRemoveTaskEmployee, useTaskLineActivities, useUpdateTaskEmployeeActivity, weeklyPlanTaskEmployeeProvider, type BoardTarget } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    taskId: string;
    lineSkuId: number;
    editable: boolean;
}

export function WeeklyPlanTaskEmployeesRoster({ taskId, lineSkuId, editable }: Props) {
    const { handleRemove } = useRemoveTaskEmployee(taskId);
    const { updateActivities, pendingMoves } = useUpdateTaskEmployeeActivity(taskId);
    const activitiesQuery = useTaskLineActivities(lineSkuId);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: taskEmployeesQueryKey(taskId),
        queryFn: () => weeklyPlanTaskEmployeeProvider.getEmployeesByTaskId(taskId),
        retry: false
    });

    const employees = data ?? [];
    const cards = buildRosterBoardCards(employees, pendingMoves);
    const slots = buildActivitySlots(activitiesQuery.data ?? [], getCardActivityIds(cards));
    const missing = countMissingActivities(employees);

    const handleMove = (keys: string[], target: BoardTarget) => {
        if (target !== null) updateActivities(keys, target);
    };

    const handleRemoveCard = (key: string) => {
        const assignment = findAssignmentByKey(employees, key);
        if (assignment) handleRemove(assignment);
    };

    const view = getRosterView(isLoading, isError, employees.length);

    return (
        <FadeSwitch switchKey={view}>
            {view === 'board' ? (
                <div className="space-y-6">
                    <MissingActivitiesAlert count={missing} editable={editable} />

                    <StaffActivityBoard
                        slots={slots}
                        cards={cards}
                        isLoading={activitiesQuery.isLoading}
                        errorMessage={activitiesQuery.error?.message}
                        description={editable
                            ? 'Para cambiar de actividad, toca a una o varias personas y pulsa «Colocar aquí» en la nueva actividad, o arrástralas.'
                            : 'Personal de la tarea en cada actividad de la línea.'}
                        poolTitle="Sin actividad"
                        poolDescription="Asignados antes de las actividades por línea."
                        showPool={missing > 0}
                        readonly={!editable}
                        pendingKeys={getPendingKeys(pendingMoves)}
                        onMove={handleMove}
                        actions={{ onRemove: employees.length > 1 ? handleRemoveCard : undefined }}
                    />
                </div>
            ) : (
                <div className="overflow-hidden rounded-xl border border-line bg-surface">
                    {view === 'loading' && <StaffListLoading />}
                    {view === 'error' && <StaffListError message={error?.message ?? ''} />}
                    {view === 'empty' && (
                        <StaffListEmpty
                            title="Sin personal asignado"
                            description="El personal aparecerá aquí cuando se confirme la asignación de la tarea."
                        />
                    )}
                </div>
            )}
        </FadeSwitch>
    )
}
