import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { invalidateTaskEmployeeQueries, splitErrorMessages, taskByIdQueryKey, weeklyPlanTaskEmployeeProvider, type ConfirmWeeklyPlanTaskEmployeesForm } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

export function useConfirmTaskEmployees(taskId: string) {
    const notification = useNotification();
    const queryClient = useQueryClient();
    const [errors, setErrors] = useState<string[]>([]);

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: ConfirmWeeklyPlanTaskEmployeesForm) => weeklyPlanTaskEmployeeProvider.confirmEmployeesByTaskId(taskId, payload),
        onSuccess: (message) => {
            setErrors([]);
            notification.success(message);
            queryClient.invalidateQueries({ queryKey: taskByIdQueryKey(taskId) });
            invalidateTaskEmployeeQueries(queryClient, taskId);
        },
        onError: (err) => {
            setErrors(splitErrorMessages(err.message));
            notification.error('No se pudo confirmar el personal');
        }
    });

    return { confirm: mutate, isPending, errors, clearErrors: () => setErrors([]) };
}
