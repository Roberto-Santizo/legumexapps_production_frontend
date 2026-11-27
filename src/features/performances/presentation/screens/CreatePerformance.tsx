import { CustomFilledButton, CustomForm, Loading, Title, useNotification } from "@/features/shared/shared";
import { invalidatePerformanceQueries, PerformanceFormComponent, performanceProvider, usePerformanceLineContext, type PerformanceForm } from "@/features/performances/performances";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function CreatePerformance() {
    const notification = useNotification();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { lineCode, line, isLoadingLine, returnPath } = usePerformanceLineContext();

    const {
        handleSubmit,
        register,
        control,
        setValue,
        formState: { errors }
    } = useForm<PerformanceForm>();

    useEffect(() => {
        if (line) setValue('line_id', line.id);
    }, [line, setValue]);

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: PerformanceForm) => performanceProvider.createPerformance(payload),
        onSuccess: (message) => {
            notification.success(message);
            invalidatePerformanceQueries(queryClient);
            navigate(returnPath);
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const onSubmit = (payload: PerformanceForm) => mutate(line ? { ...payload, line_id: line.id } : payload);

    if (isLoadingLine) return <Loading />
    return (
        <div className="space-y-5">
            <Title
                title={line ? `Agregar SKU a ${line.name}` : "Crear Rendimiento"}
                subtitle={line ? "Registra el rendimiento de un SKU en esta línea" : "Registra un nuevo rendimiento"}
            />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <PerformanceFormComponent register={register} errors={errors} control={control} lineLocked={Boolean(lineCode && line)} />
                <CustomFilledButton type="submit" label="Crear" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
