import { CustomFilledButton, CustomForm, Title, useNotification } from "@/features/shared/shared";
import { ActivityFormComponent, activityProvider, invalidateActivityQueries, type ActivityForm } from "@/features/activities/activities";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function CreateActivity() {
    const notification = useNotification();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<ActivityForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: ActivityForm) => activityProvider.createActivity(payload),
        onSuccess: (message) => {
            notification.success(message);
            invalidateActivityQueries(queryClient);
            navigate('/actividades');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const onSubmit = (payload: ActivityForm) => mutate(payload);

    return (
        <div className="space-y-5">
            <Title title="Crear Actividad" subtitle="Registra una actividad para usarla en la dotación de las líneas" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <ActivityFormComponent register={register} errors={errors} />
                <CustomFilledButton type="submit" label="Crear" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
