import { CustomFilledButton, CustomForm, Loading, Title, useNotification } from "@/features/shared/shared";
import { SkuPackingMaterialFormComponent, skuPackingMaterialProvider, type SkuPackingMaterialForm } from "@/features/sku-packing-materials/sku-packing-materials";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export function UpdateSkuPackingMaterial() {
    const { id } = useParams();
    const notification = useNotification();
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ['getSkuPackingMaterialById', id],
        queryFn: () => skuPackingMaterialProvider.getSkuPackingMaterialById(id!)
    });

    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        setValues
    } = useForm<SkuPackingMaterialForm>();


    const { mutate, isPending } = useMutation({
        mutationFn: (payload: SkuPackingMaterialForm) => skuPackingMaterialProvider.updateSkuPackingMaterialById(id!, payload),
        onSuccess: (message) => {
            notification.success(message);
            navigate('/sku-material-empaque');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    useEffect(() => {
        if (data) {
            const { id, sku, packing_material, ...rest } = data;
            setValues(rest);
        }
    }, [data]);


    const onSubmit = (payload: SkuPackingMaterialForm) => mutate(payload);
    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <Title title="Actualizar Material de Empaque por SKU" subtitle="Actualiza la información del material de empaque por SKU" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <SkuPackingMaterialFormComponent register={register} errors={errors} control={control} />
                <CustomFilledButton type="submit" label="Guardar Cambios" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
