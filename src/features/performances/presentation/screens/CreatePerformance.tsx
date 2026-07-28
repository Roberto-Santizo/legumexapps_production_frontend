import { CustomFilledButton, CustomForm, Title, useNotification } from "@/features/shared/shared";
import { PerformanceFormComponent, performanceProvider, type PerformanceForm } from "@/features/performances/performances";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function CreatePerformance() {
    const notification = useNotification();
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        control,
        formState: { errors }
    } = useForm<PerformanceForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: PerformanceForm) => performanceProvider.createPerformance(payload),
        onSuccess: (message) => {
            notification.success(message);
            navigate('/rendimientos');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const onSubmit = (payload: PerformanceForm) => mutate(payload);
    return (
        <div className="space-y-5">
            <Title title="Crear Rendimiento" subtitle="Registra un nuevo rendimiento" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <PerformanceFormComponent register={register} errors={errors} control={control} />
                <CustomFilledButton type="submit" label="Crear" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
