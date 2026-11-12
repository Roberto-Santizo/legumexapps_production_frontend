import { CustomFilledButton, CustomForm, ErrorComponent, Loading, Title, useNotification } from "@/features/shared/shared";
import { ActivityFormComponent, activityByIdQueryKey, activityProvider, invalidateActivityQueries, toActivityForm, type ActivityForm } from "@/features/activities/activities";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export function UpdateActivity() {
    const { id } = useParams();
    const navigate = useNavigate();
    const notification = useNotification();
    const queryClient = useQueryClient();

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors }
    } = useForm<ActivityForm>();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: activityByIdQueryKey(id!),
        queryFn: () => activityProvider.getActivityById(id!),
        retry: false
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: ActivityForm) => activityProvider.updateActivityById(id!, payload),
        onSuccess: (message) => {
            notification.success(message);
            invalidateActivityQueries(queryClient, id);
            navigate('/actividades');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    useEffect(() => {
        if (data) reset(toActivityForm(data));
    }, [data, reset]);

    const onSubmit = (payload: ActivityForm) => mutate(payload);

    if (isLoading) return <Loading />
    if (isError) return <ErrorComponent message={error.message} />
    if (data) return (
        <div className="space-y-5">
            <Title title="Actualizar Actividad" subtitle="Actualiza el nombre o la unidad de medida" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <ActivityFormComponent register={register} errors={errors} />
                <CustomFilledButton type="submit" label="Guardar Cambios" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
