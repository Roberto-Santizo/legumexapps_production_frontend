import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { buildConfirmBody, CandidatesList, ConfirmAdditionsPanel, ConfirmSummaryBar, getConfirmBlockReason, getConfirmSummary, getTakenEmployeeIds, pickEmployeesByIds, splitErrorMessages, TaskEmployeeErrorList, toEmployeeOptions, useCandidateRows, weeklyPlanTaskEmployeeProvider } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    taskId: string;
}

export function WeeklyPlanTaskEmployeesConfirm({ taskId }: Props) {
    const notification = useNotification();
    const queryClient = useQueryClient();
    const [errors, setErrors] = useState<string[]>([]);

    const candidatesQuery = useQuery({
        queryKey: ['getWeeklyPlanTaskAvailableEmployees', taskId],
        queryFn: () => weeklyPlanTaskEmployeeProvider.getAvailableEmployeesByTaskId(taskId),
        retry: false
    });

    const planEmployeesQuery = useQuery({
        queryKey: ['getWeeklyPlanEmployees'],
        queryFn: () => weeklyPlanTaskEmployeeProvider.getWeeklyPlanEmployees(),
        retry: false
    });

    const planEmployees = planEmployeesQuery.data ?? [];
    const { rows, additions, setAction, setReplacement, addAddition, removeAddition, reset } = useCandidateRows(candidatesQuery.data ?? []);
    const summary = getConfirmSummary(rows, additions);
    const blockReason = candidatesQuery.isLoading ? 'Cargando candidatos' : getConfirmBlockReason(summary);

    const { mutate, isPending } = useMutation({
        mutationFn: () => weeklyPlanTaskEmployeeProvider.confirmEmployeesByTaskId(taskId, buildConfirmBody(rows, additions)),
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

    const handleConfirm = () => notification.question(
        '¿Desea confirmar el personal de la tarea?',
        'Confirmar',
        `La tarea quedará con ${summary.finalCount} empleados y pasará a lista para ejecución. La confirmación se hace una sola vez.`,
        () => mutate()
    );

    const handleReset = () => {
        reset();
        setErrors([]);
    };

    return (
        <div className="space-y-6">
            <TaskEmployeeErrorList title="No se pudo confirmar el personal" errors={errors} />

            <CandidatesList
                rows={rows}
                isLoading={candidatesQuery.isLoading}
                errorMessage={candidatesQuery.error?.message}
                isLoadingOptions={planEmployeesQuery.isLoading}
                getReplacementOptions={(candidateId) => toEmployeeOptions(planEmployees, getTakenEmployeeIds(rows, additions, candidateId))}
                onActionChange={setAction}
                onReplacementChange={setReplacement}
            />

            <ConfirmAdditionsPanel
                added={pickEmployeesByIds(planEmployees, additions)}
                options={toEmployeeOptions(planEmployees, getTakenEmployeeIds(rows, additions))}
                isLoadingOptions={planEmployeesQuery.isLoading}
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
