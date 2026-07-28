import { CustomFilledButton, CustomForm, Title, useNotification } from "@/features/shared/shared";
import { SkuFormComponent, skuProvider, type SkuForm } from "@/features/skus/skus";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function CreateSku() {
    const notification = useNotification();
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        control,
        formState: { errors }
    } = useForm<SkuForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: SkuForm) => skuProvider.createSku(payload),
        onSuccess: (message) => {
            notification.success(message);
            navigate('/skus');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const onSubmit = (payload: SkuForm) => mutate(payload);
    return (
        <div className="space-y-5">
            <Title title="Crear SKU" subtitle="Registra un nuevo SKU" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <SkuFormComponent register={register} errors={errors} control={control} />
                <CustomFilledButton type="submit" label="Crear" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
