import { CustomFilledButton, CustomForm, ErrorComponent, Loading, Title, useNotification } from "@/features/shared/shared";
import { CaptureFieldFormComponent, canEditCaptureField, captureFieldsProvider, isCaptureFieldStructureLocked, toCaptureFieldForm, toCaptureFieldPayload, type CaptureFieldForm } from "@/features/capture-fields/capture-fields";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export function UpdateCaptureField() {
    const { id } = useParams();
    const navigate = useNavigate();
    const notification = useNotification();
    const queryClient = useQueryClient();

    const {
        handleSubmit,
        register,
        control,
        reset,
        formState: { errors }
    } = useForm<CaptureFieldForm>();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['getCaptureFieldById', id],
        queryFn: () => captureFieldsProvider.getCaptureFieldById(id!),
        retry: false
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (form: CaptureFieldForm) => captureFieldsProvider.updateCaptureFieldById(id!, toCaptureFieldPayload(form, data)),
        onSuccess: (message) => {
            notification.success(message);
            queryClient.invalidateQueries({ queryKey: ['getCaptureFieldById', id] });
            navigate('/campos-captura');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    useEffect(() => {
        if (data) reset(toCaptureFieldForm(data));
    }, [data, reset]);

    const onSubmit = (form: CaptureFieldForm) => mutate(form);

    if (isLoading) return <Loading />
    if (isError) return <ErrorComponent message={error.message} />
    if (data && !canEditCaptureField(data)) return <ErrorComponent message="Los campos de sistema no se pueden modificar" />
    if (data) return (
        <div className="space-y-5">
            <Title title="Actualizar Campo de Captura" subtitle="Actualiza la información del campo" />

            <section>
                <CustomForm onSubmit={handleSubmit(onSubmit)}>
                    <CaptureFieldFormComponent
                        register={register}
                        control={control}
                        errors={errors}
                        structureLocked={isCaptureFieldStructureLocked(data)}
                    />
                    <CustomFilledButton type="submit" label="Guardar Cambios" disabled={isPending} />
                </CustomForm>
            </section>
        </div>
    )
}
