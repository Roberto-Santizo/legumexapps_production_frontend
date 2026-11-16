import { useQuery } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { biometricQueryProvider } from "@/features/biometric-queries/biometric-queries";
import { ActivityCapacityAlert, ActivitySlotsBoard, buildActivitySlots, buildConfirmBody, CandidatesList, ConfirmAdditionsPanel, ConfirmSummaryBar, getConfirmBlockReason, getConfirmQuestion, getConfirmSummary, getSelectedActivityIds, getSlotsCapacity, getTakenEmployeeIds, pickAddedEmployees, REPLACEMENT_LINE_CODE, TaskEmployeeErrorList, toActivityOptions, toEmployeeOptions, useCandidateRows, useConfirmTaskEmployees, useTaskLineActivities, weeklyPlanTaskEmployeeProvider } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

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
    const { rows, additions, hasChanges, setAction, setReplacement, setRowActivity, addAddition, removeAddition, setAdditionActivity, reset } = useCandidateRows(showCandidates ? candidatesQuery.data ?? [] : []);
    const slots = buildActivitySlots(activitiesQuery.data ?? [], getSelectedActivityIds(rows, additions));
    const summary = getConfirmSummary(rows, additions);
    const isLoadingData = candidatesQuery.isLoading || activitiesQuery.isLoading;
    const blockReason = isLoadingData ? 'Cargando candidatos y actividades' : getConfirmBlockReason(summary, slots);
    const getActivityOptions = (lineActivityId?: number) => toActivityOptions(slots, lineActivityId);

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

            <ActivitySlotsBoard
                slots={slots}
                isLoading={activitiesQuery.isLoading}
                errorMessage={activitiesQuery.error?.message}
                description="Cada empleado ocupa un lugar en la actividad que se le asigne."
            />

            {showCandidates && (
                <>
                    <ActivityCapacityAlert capacity={getSlotsCapacity(slots)} candidates={rows.length} />

                    <CandidatesList
                        rows={rows}
                        isLoading={candidatesQuery.isLoading}
                        errorMessage={candidatesQuery.error?.message}
                        isLoadingOptions={replacementEmployeesQuery.isLoading}
                        getReplacementOptions={(candidateId) => toEmployeeOptions(replacementEmployees, getTakenEmployeeIds(rows, additions, candidateId))}
                        getActivityOptions={getActivityOptions}
                        onActionChange={setAction}
                        onReplacementChange={setReplacement}
                        onActivityChange={setRowActivity}
                    />
                </>
            )}

            <ConfirmAdditionsPanel
                added={pickAddedEmployees(replacementEmployees, additions)}
                options={toEmployeeOptions(replacementEmployees, getTakenEmployeeIds(rows, additions))}
                isLoadingOptions={replacementEmployeesQuery.isLoading}
                getActivityOptions={getActivityOptions}
                onAdd={addAddition}
                onRemove={removeAddition}
                onActivityChange={setAdditionActivity}
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
