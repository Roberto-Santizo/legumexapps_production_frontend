import { CustomFilledButton, CustomForm, Title, useNotification } from "@/features/shared/shared";
import { RawMaterialFormComponent, rawMaterialProvider, type RawMaterialItemForm } from "@/features/raw-materials/raw-materials";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function CreateRawMaterial() {
    const notification = useNotification();
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<RawMaterialItemForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: RawMaterialItemForm) => rawMaterialProvider.createRawMaterialItem(payload),
        onSuccess: (message) => {
            notification.success(message);
            navigate('/items-materia-prima');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const onSubmit = (payload: RawMaterialItemForm) => mutate(payload);
    return (
        <div className="space-y-5">
            <Title title="Crear Materia Prima" subtitle="Registra una nueva materia prima" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <RawMaterialFormComponent register={register} errors={errors} />
                <CustomFilledButton type="submit" label="Crear" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
