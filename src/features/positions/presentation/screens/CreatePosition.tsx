import { CustomFilledButton, CustomForm, Title, useNotification } from "@/features/shared/shared";
import { PositionFormComponent, positionProvider, type PositionForm } from "@/features/positions/positions";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function CreatePosition() {
    const notification = useNotification();
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        control,
        formState: { errors }
    } = useForm<PositionForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: PositionForm) => positionProvider.createPosition(payload),
        onSuccess: (message) => {
            notification.success(message);
            navigate('/posiciones');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const onSubmit = (payload: PositionForm) => mutate(payload);
    return (
        <div className="space-y-5">
            <Title title="Crear Puesto" subtitle="Registra un nuevo puesto" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <PositionFormComponent register={register} errors={errors} control={control} />
                <CustomFilledButton type="submit" label="Crear" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
