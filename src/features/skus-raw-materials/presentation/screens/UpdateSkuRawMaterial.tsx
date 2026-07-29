import { CustomFilledButton, CustomForm, Loading, Title, useNotification } from "@/features/shared/shared";
import { SkuRawMaterialFormComponent, skuRawMaterialProvider, type SkuRawMaterialForm } from "@/features/skus-raw-materials/skus-raw-materials";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export function UpdateSkuRawMaterial() {
    const { id } = useParams();
    const notification = useNotification();
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ['getSkuRawMaterialById', id],
        queryFn: () => skuRawMaterialProvider.getSkuRawMaterialById(id!)
    });

    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        setValues
    } = useForm<SkuRawMaterialForm>();


    const { mutate, isPending } = useMutation({
        mutationFn: (payload: SkuRawMaterialForm) => skuRawMaterialProvider.updateSkuRawMaterialById(id!, payload),
        onSuccess: (message) => {
            notification.success(message);
            navigate('/skus-materias-primas');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    useEffect(() => {
        if (data) {
            const { id, sku, raw_material, ...rest } = data;
            setValues(rest);
        }
    }, [data]);


    const onSubmit = (payload: SkuRawMaterialForm) => mutate(payload);
    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <Title title="Actualizar Materia Prima por SKU" subtitle="Actualiza la información de la materia prima por SKU" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <SkuRawMaterialFormComponent register={register} errors={errors} control={control} />
                <CustomFilledButton type="submit" label="Guardar Cambios" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
