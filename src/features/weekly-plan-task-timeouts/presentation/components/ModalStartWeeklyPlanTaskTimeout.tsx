import { CustomFilledButton, CustomForm, getQueryParam, handleDeleteQueryParam, Modal, queryParamExists } from "@/features/shared/shared";
import { TimeoutNotice, TimeoutTaskSummary, timeoutTaskQueryKey, useStartWeeklyPlanTaskTimeout, WeeklyPlanTaskTimeoutFormComponent, type WeeklyPlanTaskTimeoutForm } from "@/features/weekly-plan-task-timeouts/weekly-plan-task-timeouts";
import { weeklyPlanTaskProvider } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export function ModalStartWeeklyPlanTaskTimeout() {
    const location = useLocation();
    const navigate = useNavigate();
    const taskId = getQueryParam(location, 'startTimeout') ?? '';
    const show = queryParamExists(location, 'startTimeout');

    const closeModal = () => handleDeleteQueryParam(location, navigate, 'startTimeout');

    const { data: task, isLoading, isError, error } = useQuery({
        queryKey: timeoutTaskQueryKey(taskId),
        queryFn: () => weeklyPlanTaskProvider.getWeeklyPlanTaskById(taskId),
        enabled: show,
        retry: false
    });

    const {
        handleSubmit,
        register,
        reset,
        control,
        formState: { errors }
    } = useForm<WeeklyPlanTaskTimeoutForm>();

    useEffect(() => {
        if (!show) reset({ observation: '' });
    }, [show, reset]);

    const { startTimeout, isStarting } = useStartWeeklyPlanTaskTimeout({ weeklyPlanTaskId: taskId, onSuccess: closeModal });

    const onSubmit = (form: WeeklyPlanTaskTimeoutForm) => startTimeout(form);

    return (
        <Modal modal={show} closeModal={closeModal} title="Abrir tiempo muerto" width="sm:max-w-lg">
            {isLoading && (
                <div className="h-40 animate-pulse rounded-xl bg-canvas motion-reduce:animate-none" />
            )}

            {isError && (
                <TimeoutNotice title="No se pudo cargar la tarea" message={error.message} />
            )}

            {task && task.status !== 4 && (
                <TimeoutNotice
                    title="La tarea no está en progreso"
                    message="Solo se registran tiempos muertos mientras la tarea está en progreso."
                />
            )}

            {task && task.status === 4 && task.open_timeout_id !== null && (
                <TimeoutNotice
                    title="La línea ya está detenida"
                    message="Cierra el tiempo muerto en curso antes de abrir otro."
                />
            )}

            {task && task.status === 4 && task.open_timeout_id === null && (
                <div className="space-y-5">
                    <TimeoutTaskSummary task={task} />

                    <CustomForm onSubmit={handleSubmit(onSubmit)} className="border-none p-0 shadow-none">
                        <WeeklyPlanTaskTimeoutFormComponent register={register} errors={errors} control={control} />

                        <p className="text-xs text-ink-subtle">La hora de inicio se registra al abrir el tiempo muerto.</p>

                        <CustomFilledButton type="submit" label="Abrir tiempo muerto" disabled={isStarting} fullWitdh />
                    </CustomForm>
                </div>
            )}
        </Modal>
    )
}
