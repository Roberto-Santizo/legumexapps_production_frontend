import { useQuery } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { biometricQueryProvider } from "@/features/biometric-queries/biometric-queries";
import { ActivityCapacityAlert, buildActivitySlots, buildConfirmBoardCards, buildConfirmBody, ConfirmSummaryBar, getCardOwnerId, getConfirmBlockReason, getConfirmQuestion, getConfirmSummary, getRemovedCandidates, getSelectedActivityIds, getSlotsCapacity, getTakenEmployeeIds, PoolAddEmployee, RemovedCandidatesList, REPLACEMENT_LINE_CODE, StaffActivityBoard, TaskEmployeeErrorList, toEmployeeOptions, useCandidateRows, useConfirmTaskEmployees, useTaskLineActivities, weeklyPlanTaskEmployeeProvider, type BoardCardActions } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    taskId: string;
    lineCode: string;
    showCandidates: boolean;
}

export function WeeklyPlanTaskEmployeesConfirm({ taskId, lineCode, showCandidates }: Props) {
    const notification = useNotification();

    const candidatesQuery = useQuery({
        queryKey: ['getWeeklyPlanTaskAvailableEmployees', taskId],
        queryFn: () => weeklyPlanTaskEmployeeProvider.getAvailableEmployeesByTaskId(taskId),
        enabled: showCandidates,
        retry: false
    });

    const replacementEmployeesQuery = useQuery({
        queryKey: ['getBiometricEmployeesByLineCode', REPLACEMENT_LINE_CODE],
        queryFn: () => biometricQueryProvider.getEmployeesByLineCode(REPLACEMENT_LINE_CODE),
        retry: false
    });

    const activitiesQuery = useTaskLineActivities(lineCode);
    const { confirm, isPending, errors, clearErrors } = useConfirmTaskEmployees(taskId);

    const replacementEmployees = replacementEmployeesQuery.data ?? [];
    const { rows, additions, hasChanges, addAddition, assignCard, replaceCard, undoReplaceCard, removeCard, restoreCandidate, reset } = useCandidateRows(showCandidates ? candidatesQuery.data ?? [] : []);
    const slots = buildActivitySlots(activitiesQuery.data ?? [], getSelectedActivityIds(rows, additions));
    const cards = buildConfirmBoardCards(rows, additions, replacementEmployees);
    const summary = getConfirmSummary(rows, additions);
    const isLoadingData = candidatesQuery.isLoading || activitiesQuery.isLoading;
    const blockReason = isLoadingData ? 'Cargando candidatos y actividades' : getConfirmBlockReason(summary, slots);

    const cardActions: BoardCardActions = {
        onRemove: removeCard,
        onReplace: replaceCard,
        onUndoReplace: undoReplaceCard,
        getReplacementOptions: (key) => toEmployeeOptions(replacementEmployees, getTakenEmployeeIds(rows, additions, getCardOwnerId(key))),
        isLoadingOptions: replacementEmployeesQuery.isLoading,
    };

    const handleConfirm = () => {
        const { title, description } = getConfirmQuestion(summary.finalCount);
        notification.question(title, 'Confirmar', description, () => confirm(buildConfirmBody(rows, additions, replacementEmployees)));
    };

    const handleReset = () => {
        reset();
        clearErrors();
    };

    return (
        <div className="space-y-6">
            <TaskEmployeeErrorList title="No se pudo confirmar el personal" errors={errors} />

            {showCandidates && <ActivityCapacityAlert capacity={getSlotsCapacity(slots)} candidates={rows.length} />}

            <StaffActivityBoard
                slots={slots}
                cards={cards}
                isLoading={isLoadingData}
                errorMessage={activitiesQuery.error?.message ?? candidatesQuery.error?.message}
                description="Arrastra a cada empleado al lugar libre de la actividad que cubrirá. En pantallas táctiles, tócalo y luego toca el lugar."
                poolTitle="Por asignar"
                poolDescription="Candidatos de la línea y altas que aún no tienen actividad. Reemplázalos o dalos de baja desde su tarjeta."
                showPool
                allowUnassign
                onMove={assignCard}
                actions={cardActions}
                poolHeader={
                    <PoolAddEmployee
                        options={toEmployeeOptions(replacementEmployees, getTakenEmployeeIds(rows, additions))}
                        isLoading={replacementEmployeesQuery.isLoading}
                        onAdd={addAddition}
                    />
                }
                poolFooter={<RemovedCandidatesList rows={getRemovedCandidates(rows)} onRestore={restoreCandidate} />}
            />

            <ConfirmSummaryBar
                summary={summary}
                blockReason={blockReason}
                hasChanges={hasChanges}
                isPending={isPending}
                onConfirm={handleConfirm}
                onReset={handleReset}
            />
        </div>
    )
}
