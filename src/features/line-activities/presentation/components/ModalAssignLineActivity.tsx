import { CustomFilledButton, CustomForm, Modal } from "@/features/shared/shared";
import { activitiesQueryKey, activityProvider } from "@/features/activities/activities";
import { AssignLineActivityFormComponent, availableActivityOptions, useAssignLineActivity, type AssignLineActivityForm, type LineActivity } from "@/features/line-activities/line-activities";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type Props = {
    open: boolean;
    close: () => void;
    lineCode: string;
    assigned: LineActivity[];
}

export function ModalAssignLineActivity({ open, close, lineCode, assigned }: Props) {
    const {
        handleSubmit,
        register,
        control,
        reset,
        formState: { errors }
    } = useForm<AssignLineActivityForm>();

    const handleClose = () => {
        reset();
        close();
    };

    const { assignActivity, isAssigning } = useAssignLineActivity({ lineCode, onSuccess: handleClose });

    const { data, isLoading, isError, error } = useQuery({
        queryKey: [...activitiesQueryKey, 'catalog'],
        queryFn: () => activityProvider.getActivities('', ''),
        enabled: open,
        retry: false
    });

    const options = availableActivityOptions(data?.data ?? [], assigned);

    const onSubmit = (form: AssignLineActivityForm) => assignActivity(form);

    return (
        <Modal modal={open} closeModal={handleClose} title="Asignar actividad" width="sm:max-w-lg">
            {isLoading && <div className="h-40 animate-pulse rounded-xl bg-canvas motion-reduce:animate-none" />}

            {isError && <p className="text-sm text-red-500">{error.message}</p>}

            {data && options.length === 0 && (
                <div className="rounded-xl border border-dashed border-line-strong px-5 py-8 text-center">
                    <p className="text-sm text-ink-muted">Todas las actividades del catálogo ya están asignadas a esta línea.</p>
                    <Link to="/actividades/crear" className="mt-3 inline-block text-sm font-semibold text-ink underline underline-offset-4 hover:text-ink-muted">
                        Crear actividad
                    </Link>
                </div>
            )}

            {data && options.length > 0 && (
                <CustomForm onSubmit={handleSubmit(onSubmit)} className="border-none p-0 shadow-none">
                    <AssignLineActivityFormComponent register={register} control={control} errors={errors} options={options} />
                    <CustomFilledButton type="submit" label="Asignar" disabled={isAssigning} fullWitdh />
                </CustomForm>
            )}
        </Modal>
    )
}
