import { CustomFilledButton, CustomForm, Loading, Title, useNotification } from "@/features/shared/shared";
import { SkuFormComponent, skuProvider, type SkuForm } from "@/features/skus/skus";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export function UpdateSku() {
    const { id } = useParams();
    const notification = useNotification();
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ['getSkuByCode', id],
        queryFn: () => skuProvider.getSkuByCode(id!)
    });

    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        setValues
    } = useForm<SkuForm>();


    const { mutate, isPending } = useMutation({
        mutationFn: (payload: SkuForm) => skuProvider.updateSkuByCode(id!, payload),
        onSuccess: (message) => {
            notification.success(message);
            navigate('/skus');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    useEffect(() => {
        if (data) {
            const { id, client, ...rest } = data;
            setValues(rest);
        }
    }, [data]);


    const onSubmit = (payload: SkuForm) => mutate(payload);
    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <Title title="Actualizar SKU" subtitle="Actualiza la información del SKU" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <SkuFormComponent register={register} errors={errors} control={control} />
                <CustomFilledButton type="submit" label="Guardar Cambios" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
