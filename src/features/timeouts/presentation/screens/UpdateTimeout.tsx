import { CustomFilledButton, CustomForm, Loading, Title, useNotification } from "@/features/shared/shared";
import { TimeoutFormComponent, timeoutProvider, type TimeoutForm } from "@/features/timeouts/timeouts";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export function UpdateTimeout() {
    const { id } = useParams();
    const notification = useNotification();
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ['getTimeoutById', id],
        queryFn: () => timeoutProvider.getTimeoutById(id!)
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValues
    } = useForm<TimeoutForm>();


    const { mutate, isPending } = useMutation({
        mutationFn: (payload: TimeoutForm) => timeoutProvider.updateTimeoutById(id!, payload),
        onSuccess: (message) => {
            notification.success(message);
            navigate('/tiempos-muertos');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    useEffect(() => {
        if (data) {
            const { id, ...rest } = data;
            setValues(rest);
        }
    }, [data]);


    const onSubmit = (payload: TimeoutForm) => mutate(payload);
    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <Title title="Actualizar Tiempo Muerto" subtitle="Actualiza la información del tiempo muerto" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <TimeoutFormComponent register={register} errors={errors} />
                <CustomFilledButton type="submit" label="Guardar Cambios" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
