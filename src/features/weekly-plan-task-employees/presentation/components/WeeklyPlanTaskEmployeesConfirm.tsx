import { useQuery } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { biometricQueryProvider } from "@/features/biometric-queries/biometric-queries";
import { ActivityCapacityAlert, buildActivitySlots, buildConfirmBoardCards, buildConfirmBody, CandidatesList, ConfirmAdditionsPanel, ConfirmSummaryBar, getConfirmBlockReason, getConfirmQuestion, getConfirmSummary, getSelectedActivityIds, getSlotsCapacity, getTakenEmployeeIds, pickAddedEmployees, REPLACEMENT_LINE_CODE, StaffActivityBoard, TaskEmployeeErrorList, toEmployeeOptions, useCandidateRows, useConfirmTaskEmployees, useTaskLineActivities, weeklyPlanTaskEmployeeProvider } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

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
    const { rows, additions, hasChanges, setAction, setReplacement, addAddition, removeAddition, assignCard, removeCard, reset } = useCandidateRows(showCandidates ? candidatesQuery.data ?? [] : []);
    const slots = buildActivitySlots(activitiesQuery.data ?? [], getSelectedActivityIds(rows, additions));
    const cards = buildConfirmBoardCards(rows, additions, replacementEmployees);
    const summary = getConfirmSummary(rows, additions);
    const isLoadingData = candidatesQuery.isLoading || activitiesQuery.isLoading;
    const blockReason = isLoadingData ? 'Cargando candidatos y actividades' : getConfirmBlockReason(summary, slots);

    const handleConfirm = () => {
        const { title, description } = getConfirmQuestion(summary.finalCount);
        notification.question(title, 'Confirmar', description, () => confirm(buildConfirmBody(rows, additions, replacementEmployees)));
    };

    const handleReset = () => {
        reset();
        clearErrors();
    };

    return (
        <div className="space-y-8">
            <TaskEmployeeErrorList title="No se pudo confirmar el personal" errors={errors} />

            {showCandidates && <ActivityCapacityAlert capacity={getSlotsCapacity(slots)} candidates={rows.length} />}

            <StaffActivityBoard
                slots={slots}
                cards={cards}
                isLoading={isLoadingData}
                errorMessage={activitiesQuery.error?.message ?? candidatesQuery.error?.message}
                description="Arrastra a cada empleado al lugar libre de la actividad que cubrirá. En pantallas táctiles, tócalo y luego toca el lugar."
                poolTitle="Por asignar"
                poolDescription="Personal de la tarea que aún no tiene actividad."
                showPool
                allowUnassign
                onMove={assignCard}
                onRemove={removeCard}
            />

            {showCandidates && (
                <CandidatesList
                    rows={rows}
                    isLoading={candidatesQuery.isLoading}
                    errorMessage={candidatesQuery.error?.message}
                    isLoadingOptions={replacementEmployeesQuery.isLoading}
                    getReplacementOptions={(candidateId) => toEmployeeOptions(replacementEmployees, getTakenEmployeeIds(rows, additions, candidateId))}
                    onActionChange={setAction}
                    onReplacementChange={setReplacement}
                />
            )}

            <ConfirmAdditionsPanel
                added={pickAddedEmployees(replacementEmployees, additions)}
                options={toEmployeeOptions(replacementEmployees, getTakenEmployeeIds(rows, additions))}
                isLoadingOptions={replacementEmployeesQuery.isLoading}
                onAdd={addAddition}
                onRemove={removeAddition}
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
