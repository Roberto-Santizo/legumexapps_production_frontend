import { CustomFilledButton, CustomForm, Title, useNotification } from "@/features/shared/shared";
import { PackingMaterialFormComponent, packingMaterialProvider, type PackingMaterialItemForm } from "@/features/packing-materials/packing-materials";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function CreatePackingMaterial() {
    const notification = useNotification();
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<PackingMaterialItemForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: PackingMaterialItemForm) => packingMaterialProvider.createPackingMaterialItem(payload),
        onSuccess: (message) => {
            notification.success(message);
            navigate('/items-material-empaque');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const onSubmit = (payload: PackingMaterialItemForm) => mutate(payload);
    return (
        <div className="space-y-5">
            <Title title="Crear Material de Empaque" subtitle="Registra un nuevo material de empaque" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <PackingMaterialFormComponent register={register} errors={errors} />
                <CustomFilledButton type="submit" label="Crear" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
