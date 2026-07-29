import { CustomFilledButton, CustomForm, Title, useNotification } from "@/features/shared/shared";
import { SkuRawMaterialFormComponent, skuRawMaterialProvider, type SkuRawMaterialForm } from "@/features/skus-raw-materials/skus-raw-materials";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function CreateSkuRawMaterial() {
    const notification = useNotification();
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        control,
        formState: { errors }
    } = useForm<SkuRawMaterialForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: SkuRawMaterialForm) => skuRawMaterialProvider.createSkuRawMaterial(payload),
        onSuccess: (message) => {
            notification.success(message);
            navigate('/skus-materias-primas');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const onSubmit = (payload: SkuRawMaterialForm) => mutate(payload);
    return (
        <div className="space-y-5">
            <Title title="Crear Materia Prima por SKU" subtitle="Registra una nueva materia prima por SKU" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <SkuRawMaterialFormComponent register={register} errors={errors} control={control} />
                <CustomFilledButton type="submit" label="Crear" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
