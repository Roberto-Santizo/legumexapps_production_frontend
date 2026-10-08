import { CustomFilledButton, CustomForm, getQueryParam, handleDeleteQueryParam, Modal, queryParamExists } from "@/features/shared/shared";
import { findOpenTimeout, StoppedLineBanner, TimeoutNotice, timeoutTaskQueryKey, useEndWeeklyPlanTaskTimeout, weeklyPlanTaskTimeoutProvider, weeklyPlanTaskTimeoutsQueryKey, WeeklyPlanTaskTimeoutEndFormComponent, type WeeklyPlanTaskTimeoutEndForm } from "@/features/weekly-plan-task-timeouts/weekly-plan-task-timeouts";
import { weeklyPlanTaskProvider } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export function ModalEndWeeklyPlanTaskTimeout() {
    const location = useLocation();
    const navigate = useNavigate();
    const taskId = getQueryParam(location, 'endTimeout') ?? '';
    const show = queryParamExists(location, 'endTimeout');

    const closeModal = () => handleDeleteQueryParam(location, navigate, 'endTimeout');

    const { data: task, isLoading: isLoadingTask, isError, error } = useQuery({
        queryKey: timeoutTaskQueryKey(taskId),
        queryFn: () => weeklyPlanTaskProvider.getWeeklyPlanTaskById(taskId),
        enabled: show,
        retry: false
    });

    const { data: timeouts, isLoading: isLoadingTimeouts } = useQuery({
        queryKey: weeklyPlanTaskTimeoutsQueryKey(taskId),
        queryFn: () => weeklyPlanTaskTimeoutProvider.getWeeklyPlanTaskTimeouts(taskId),
        enabled: show,
        retry: false
    });

    const openTimeout = timeouts ? findOpenTimeout(timeouts) : null;

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors }
    } = useForm<WeeklyPlanTaskTimeoutEndForm>();

    useEffect(() => {
        if (show && openTimeout) reset({ observation: openTimeout.observation ?? '' });
    }, [show, openTimeout, reset]);

    const { endTimeout, isEnding } = useEndWeeklyPlanTaskTimeout({
        timeoutId: String(openTimeout?.id ?? ''),
        weeklyPlanTaskId: taskId,
        onSuccess: closeModal
    });

    const onSubmit = (form: WeeklyPlanTaskTimeoutEndForm) => endTimeout(form);

    return (
        <Modal modal={show} closeModal={closeModal} title="Cerrar tiempo muerto" width="sm:max-w-lg">
            {(isLoadingTask || isLoadingTimeouts) && (
                <div className="h-40 animate-pulse rounded-xl bg-canvas motion-reduce:animate-none" />
            )}

            {isError && (
                <TimeoutNotice title="No se pudo cargar la tarea" message={error.message} />
            )}

            {task && timeouts && task.status !== 4 && (
                <TimeoutNotice
                    title="La tarea no está en progreso"
                    message="Los tiempos muertos solo se cierran mientras la tarea está en progreso."
                />
            )}

            {task && timeouts && task.status === 4 && !openTimeout && (
                <TimeoutNotice
                    title="La línea no está detenida"
                    message="Esta tarea no tiene un tiempo muerto abierto."
                />
            )}

            {task && task.status === 4 && openTimeout && (
                <div className="space-y-5">
                    <StoppedLineBanner timeout={openTimeout} />

                    <CustomForm onSubmit={handleSubmit(onSubmit)} className="border-none p-0 shadow-none">
                        <WeeklyPlanTaskTimeoutEndFormComponent register={register} errors={errors} />

                        <p className="text-xs text-ink-subtle">La hora de fin y la duración se registran al cerrar el tiempo muerto.</p>

                        <CustomFilledButton type="submit" label="Cerrar tiempo muerto" disabled={isEnding} fullWitdh />
                    </CustomForm>
                </div>
            )}
        </Modal>
    )
}
