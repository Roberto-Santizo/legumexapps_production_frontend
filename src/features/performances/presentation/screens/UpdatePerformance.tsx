import { CustomFilledButton, CustomForm, Loading, Title, useNotification } from "@/features/shared/shared";
import { PerformanceFormComponent, performanceProvider, type PerformanceForm } from "@/features/performances/performances";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export function UpdatePerformance() {
    const { id } = useParams();
    const notification = useNotification();
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ['getPerformanceById', id],
        queryFn: () => performanceProvider.getPerformanceById(id!)
    });

    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        setValues
    } = useForm<PerformanceForm>();


    const { mutate, isPending } = useMutation({
        mutationFn: (payload: PerformanceForm) => performanceProvider.updatePerformanceById(id!, payload),
        onSuccess: (message) => {
            notification.success(message);
            navigate('/rendimientos');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    useEffect(() => {
        if (data) {
            const { id, sku, line, status, ...rest } = data;
            setValues(rest);
        }
    }, [data]);


    const onSubmit = (payload: PerformanceForm) => mutate(payload);
    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <Title title="Actualizar Rendimiento" subtitle="Actualiza la información del rendimiento" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <PerformanceFormComponent register={register} errors={errors} control={control} />
                <CustomFilledButton type="submit" label="Guardar Cambios" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
