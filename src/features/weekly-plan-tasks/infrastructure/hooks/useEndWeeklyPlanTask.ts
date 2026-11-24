import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseFormSetError } from "react-hook-form";
import { useNotification } from "@/features/shared/shared";
import { getEndTaskFieldErrors, replaceTask, toEndTaskPayload, weeklyPlanTaskProvider, WeeklyPlanTaskValidationError, type PaginatedWeeklyPlanTasks, type WeeklyPlanTask, type WeeklyPlanTaskEndForm } from "@/features/weekly-plan-tasks/weekly-plan-tasks";

type Props = {
    task: WeeklyPlanTask;
    setError: UseFormSetError<WeeklyPlanTaskEndForm>;
    onEnded: () => void;
    refetch: () => void;
}

export function useEndWeeklyPlanTask({ task, setError, onEnded, refetch }: Props) {
    const notification = useNotification();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (form: WeeklyPlanTaskEndForm) => weeklyPlanTaskProvider.endWeeklyPlanTask(String(task.id), toEndTaskPayload(form, task)),
        onSuccess: ({ message, task: endedTask }) => {
            notification.success(message);
            onEnded();
            queryClient.setQueryData(['getWeeklyPlanTaskById', String(endedTask.id)], endedTask);
            queryClient.setQueriesData<PaginatedWeeklyPlanTasks>({ queryKey: ['getWeeklyPlanTasksByLineDate'] }, (list) => replaceTask(list, endedTask));
        },
        onError: (err) => {
            if (err instanceof WeeklyPlanTaskValidationError) {
                const fieldErrors = getEndTaskFieldErrors(err.errors);
                fieldErrors.forEach(({ field, message }) => setError(field, { type: 'server', message }));
                if (fieldErrors.length === 0) notification.error(err.message);
                return;
            }

            notification.error(err.message);
            queryClient.invalidateQueries({ queryKey: ['getWeeklyPlanTaskById', String(task.id)] });
            refetch();
        }
    });

    const handleEndTask = (form: WeeklyPlanTaskEndForm) =>
        notification.question('¿Desea cerrar la tarea?', 'Cerrar Tarea', 'La tarea pasará a Finalizada y no se podrá revertir', () => mutate(form));

    return { handleEndTask, isEnding: isPending };
}
