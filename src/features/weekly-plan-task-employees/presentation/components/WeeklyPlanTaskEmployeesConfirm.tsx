import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { biometricQueryProvider } from "@/features/biometric-queries/biometric-queries";
import { buildConfirmBody, CandidatesList, ConfirmAdditionsPanel, ConfirmSummaryBar, getConfirmBlockReason, getConfirmQuestion, getConfirmSummary, getTakenEmployeeIds, pickEmployeesByIds, PositionsLimitAlert, REPLACEMENT_LINE_CODE, splitErrorMessages, TaskEmployeeErrorList, toEmployeeOptions, useCandidateRows, weeklyPlanTaskEmployeeProvider } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    taskId: string;
    positions: number;
    showCandidates: boolean;
}

export function WeeklyPlanTaskEmployeesConfirm({ taskId, positions, showCandidates }: Props) {
    const notification = useNotification();
    const queryClient = useQueryClient();
    const [errors, setErrors] = useState<string[]>([]);

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

    const replacementEmployees = replacementEmployeesQuery.data ?? [];
    const { rows, additions, setAction, setReplacement, addAddition, removeAddition, reset } = useCandidateRows(showCandidates ? candidatesQuery.data ?? [] : []);
    const summary = getConfirmSummary(rows, additions);
    const blockReason = candidatesQuery.isLoading ? 'Cargando candidatos' : getConfirmBlockReason(summary);

    const { mutate, isPending } = useMutation({
        mutationFn: () => weeklyPlanTaskEmployeeProvider.confirmEmployeesByTaskId(taskId, buildConfirmBody(rows, additions, replacementEmployees)),
        onSuccess: (message) => {
            setErrors([]);
            notification.success(message);
            queryClient.invalidateQueries({ queryKey: ['getWeeklyPlanTaskById', taskId] });
            queryClient.invalidateQueries({ queryKey: ['getWeeklyPlanTaskEmployees', taskId] });
        },
        onError: (err) => {
            setErrors(splitErrorMessages(err.message));
            notification.error('No se pudo confirmar el personal');
        }
    });

    const handleConfirm = () => {
        const { title, description } = getConfirmQuestion(positions, summary.finalCount);
        notification.question(title, 'Confirmar', description, () => mutate());
    };

    const handleReset = () => {
        reset();
        setErrors([]);
    };

    return (
        <div className="space-y-6">
            <TaskEmployeeErrorList title="No se pudo confirmar el personal" errors={errors} />

            {showCandidates && (
                <>
                    <PositionsLimitAlert positions={positions} candidates={rows.length} />

                    <CandidatesList
                        rows={rows}
                        isLoading={candidatesQuery.isLoading}
                        errorMessage={candidatesQuery.error?.message}
                        isLoadingOptions={replacementEmployeesQuery.isLoading}
                        getReplacementOptions={(candidateId) => toEmployeeOptions(replacementEmployees, getTakenEmployeeIds(rows, additions, candidateId))}
                        onActionChange={setAction}
                        onReplacementChange={setReplacement}
                    />
                </>
            )}

            <ConfirmAdditionsPanel
                added={pickEmployeesByIds(replacementEmployees, additions)}
                options={toEmployeeOptions(replacementEmployees, getTakenEmployeeIds(rows, additions))}
                isLoadingOptions={replacementEmployeesQuery.isLoading}
                onAdd={addAddition}
                onRemove={removeAddition}
            />

            <ConfirmSummaryBar
                summary={summary}
                blockReason={blockReason}
                isPending={isPending}
                onConfirm={handleConfirm}
                onReset={handleReset}
            />
        </div>
    )
}
