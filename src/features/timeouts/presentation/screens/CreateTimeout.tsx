import { CustomFilledButton, CustomForm, Title, useNotification } from "@/features/shared/shared";
import { TimeoutFormComponent, timeoutProvider, type TimeoutForm } from "@/features/timeouts/timeouts";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function CreateTimeout() {
    const notification = useNotification();
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<TimeoutForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: TimeoutForm) => timeoutProvider.createTimeout(payload),
        onSuccess: (message) => {
            notification.success(message);
            navigate('/tiempos-muertos');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const onSubmit = (payload: TimeoutForm) => mutate(payload);
    return (
        <div className="space-y-5">
            <Title title="Crear Tiempo Muerto" subtitle="Registra un nuevo tiempo muerto" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <TimeoutFormComponent register={register} errors={errors} />
                <CustomFilledButton type="submit" label="Crear" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
