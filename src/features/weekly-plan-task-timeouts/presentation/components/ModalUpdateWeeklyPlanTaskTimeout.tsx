import { CustomFilledButton, CustomForm, getQueryParam, handleDeleteQueryParam, InformationField, Modal, queryParamExists } from "@/features/shared/shared";
import { formatTimeoutDateTime, TimeoutNotice, useUpdateWeeklyPlanTaskTimeout, weeklyPlanTaskTimeoutProvider, weeklyPlanTaskTimeoutsQueryKey, WeeklyPlanTaskTimeoutFormComponent, type WeeklyPlanTaskTimeoutForm } from "@/features/weekly-plan-task-timeouts/weekly-plan-task-timeouts";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

type Props = {
    weeklyPlanTaskId: string;
}

export function ModalUpdateWeeklyPlanTaskTimeout({ weeklyPlanTaskId }: Props) {
    const location = useLocation();
    const navigate = useNavigate();
    const timeoutId = getQueryParam(location, 'editTaskTimeout') ?? '';
    const show = queryParamExists(location, 'editTaskTimeout');

    const closeModal = () => handleDeleteQueryParam(location, navigate, 'editTaskTimeout');

    const { data, isLoading, isError, error } = useQuery({
        queryKey: weeklyPlanTaskTimeoutsQueryKey(weeklyPlanTaskId),
        queryFn: () => weeklyPlanTaskTimeoutProvider.getWeeklyPlanTaskTimeouts(weeklyPlanTaskId),
        enabled: show,
        retry: false
    });

    const timeout = data?.find(item => String(item.id) === timeoutId) ?? null;

    const {
        handleSubmit,
        register,
        reset,
        control,
        formState: { errors }
    } = useForm<WeeklyPlanTaskTimeoutForm>();

    useEffect(() => {
        if (show && timeout) reset({ timeout_id: timeout.timeout_id, observation: timeout.observation ?? '' });
    }, [show, timeout, reset]);

    const { updateTimeout, isUpdating } = useUpdateWeeklyPlanTaskTimeout({
        timeoutId,
        weeklyPlanTaskId,
        onSuccess: closeModal
    });

    const onSubmit = (form: WeeklyPlanTaskTimeoutForm) => updateTimeout(form);

    return (
        <Modal modal={show} closeModal={closeModal} title="Editar tiempo muerto" width="sm:max-w-lg">
            {isLoading && (
                <div className="h-40 animate-pulse rounded-xl bg-canvas motion-reduce:animate-none" />
            )}

            {isError && (
                <TimeoutNotice title="No se pudo cargar el tiempo muerto" message={error.message} />
            )}

            {data && !timeout && (
                <TimeoutNotice title="El tiempo muerto no existe" message="Pudo haber sido eliminado por otro usuario." />
            )}

            {timeout && (
                <div className="space-y-5">
                    <dl className="grid grid-cols-2 gap-x-8 gap-y-3 rounded-xl border border-line bg-surface px-5 py-4">
                        <InformationField label="Inicio" value={formatTimeoutDateTime(timeout.start_date) ?? '—'} mono />
                        <InformationField label="Fin" value={formatTimeoutDateTime(timeout.end_date) ?? 'En curso'} mono />
                        <InformationField label="Registró" value={timeout.user_name} />
                    </dl>

                    <CustomForm onSubmit={handleSubmit(onSubmit)} className="border-none p-0 shadow-none">
                        <WeeklyPlanTaskTimeoutFormComponent register={register} errors={errors} control={control} />

                        <p className="text-xs text-ink-subtle">Las horas de inicio y fin no se modifican.</p>

                        <CustomFilledButton type="submit" label="Guardar cambios" disabled={isUpdating} fullWitdh />
                    </CustomForm>
                </div>
            )}
        </Modal>
    )
}
