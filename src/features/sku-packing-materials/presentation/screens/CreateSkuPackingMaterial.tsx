import { CustomFilledButton, CustomForm, Title, useNotification } from "@/features/shared/shared";
import { SkuPackingMaterialFormComponent, skuPackingMaterialProvider, type SkuPackingMaterialForm } from "@/features/sku-packing-materials/sku-packing-materials";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function CreateSkuPackingMaterial() {
    const notification = useNotification();
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        control,
        formState: { errors }
    } = useForm<SkuPackingMaterialForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: SkuPackingMaterialForm) => skuPackingMaterialProvider.createSkuPackingMaterial(payload),
        onSuccess: (message) => {
            notification.success(message);
            navigate('/sku-material-empaque');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const onSubmit = (payload: SkuPackingMaterialForm) => mutate(payload);
    return (
        <div className="space-y-5">
            <Title title="Crear Material de Empaque por SKU" subtitle="Registra un nuevo material de empaque por SKU" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <SkuPackingMaterialFormComponent register={register} errors={errors} control={control} />
                <CustomFilledButton type="submit" label="Crear" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
