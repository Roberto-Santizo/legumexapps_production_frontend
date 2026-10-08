import { CustomFilledButton, CustomForm, Title, useNotification } from "@/features/shared/shared";
import { CaptureFieldFormComponent, captureFieldsProvider, defaultCaptureFieldForm, toCaptureFieldPayload, type CaptureFieldForm } from "@/features/capture-fields/capture-fields";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function CreateCaptureField() {
    const navigate = useNavigate();
    const notification = useNotification();

    const {
        handleSubmit,
        register,
        control,
        formState: { errors }
    } = useForm<CaptureFieldForm>({ defaultValues: defaultCaptureFieldForm });

    const { mutate, isPending } = useMutation({
        mutationFn: (form: CaptureFieldForm) => captureFieldsProvider.createCaptureField(toCaptureFieldPayload(form)),
        onSuccess: (message) => {
            notification.success(message);
            navigate('/campos-captura');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const onSubmit = (form: CaptureFieldForm) => mutate(form);

    return (
        <div className="space-y-5">
            <Title title="Crear Campo de Captura" subtitle="Agrega un dato que no entra en cálculos y asígnalo a las líneas que lo usen" />

            <section>
                <CustomForm onSubmit={handleSubmit(onSubmit)}>
                    <CaptureFieldFormComponent register={register} control={control} errors={errors} />
                    <CustomFilledButton type="submit" label="Crear" disabled={isPending} />
                </CustomForm>
            </section>
        </div>
    )
}
