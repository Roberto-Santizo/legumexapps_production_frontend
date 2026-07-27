import { CustomFilledButton, CustomForm, Title, useNotification } from "@/features/shared/shared";
import { LineFormComponent, linesRepositoryProvider, type LineForm } from "@/features/lines/lines";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function CreateLine() {
    const navigate = useNavigate();
    const notification = useNotification();

    const {
        handleSubmit,
        register,
        control,
        formState: { errors }
    } = useForm<LineForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: LineForm) => linesRepositoryProvider.createLine(payload),
        onSuccess: (message) => {
            notification.success(message);
            navigate('/lineas');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const onSubmit = (payload: LineForm) => mutate(payload);

    return (
        <div className="space-y-5">
            <Title title="Crear Línea" subtitle="Registra una nueva línea" />

            <section>
                <CustomForm onSubmit={handleSubmit(onSubmit)}>
                    <LineFormComponent register={register} control={control} errors={errors} />
                    <CustomFilledButton type="submit" label="Crear" disabled={isPending} />
                </CustomForm>
            </section>
        </div>
    )
}
