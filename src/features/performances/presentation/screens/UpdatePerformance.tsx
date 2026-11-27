import { CustomFilledButton, CustomForm, ErrorComponent, Loading, Title, useNotification } from "@/features/shared/shared";
import { invalidatePerformanceQueries, PerformanceFormComponent, performanceProvider, toPerformanceForm, usePerformanceById, usePerformanceLineContext, type PerformanceForm } from "@/features/performances/performances";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export function UpdatePerformance() {
    const { id } = useParams();
    const notification = useNotification();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { lineCode, returnPath } = usePerformanceLineContext();

    const { data, isLoading, isError, error } = usePerformanceById(id ?? '');

    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        reset,
    } = useForm<PerformanceForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: PerformanceForm) => performanceProvider.updatePerformanceById(id!, payload),
        onSuccess: (message) => {
            notification.success(message);
            invalidatePerformanceQueries(queryClient);
            navigate(returnPath);
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    useEffect(() => {
        if (data) reset(toPerformanceForm(data));
    }, [data, reset]);

    const onSubmit = (payload: PerformanceForm) => mutate(payload);
    if (isLoading) return <Loading />
    if (isError) return <ErrorComponent message={error.message} />
    if (data) return (
        <div className="space-y-5">
            <Title title="Actualizar Rendimiento" subtitle={`${data.sku} · ${data.line}`} />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <PerformanceFormComponent register={register} errors={errors} control={control} lineLocked={Boolean(lineCode)} />
                <CustomFilledButton type="submit" label="Guardar Cambios" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
