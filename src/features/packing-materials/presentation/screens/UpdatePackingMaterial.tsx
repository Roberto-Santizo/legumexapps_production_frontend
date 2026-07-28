import { CustomFilledButton, CustomForm, Loading, Title, useNotification } from "@/features/shared/shared";
import { PackingMaterialFormComponent, packingMaterialProvider, type PackingMaterialItemForm } from "@/features/packing-materials/packing-materials";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export function UpdatePackingMaterial() {
    const { id } = useParams();
    const notification = useNotification();
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ['getPackingMaterialItemByCode', id],
        queryFn: () => packingMaterialProvider.getPackingMaterialItemByCode(id!)
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValues
    } = useForm<PackingMaterialItemForm>();


    const { mutate, isPending } = useMutation({
        mutationFn: (payload: PackingMaterialItemForm) => packingMaterialProvider.updatePackingMaterialItemByCode(id!, payload),
        onSuccess: (message) => {
            notification.success(message);
            navigate('/items-material-empaque');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    useEffect(() => {
        if (data) {
            const { id, blocked, ...rest } = data;
            setValues(rest);
        }
    }, [data]);


    const onSubmit = (payload: PackingMaterialItemForm) => mutate(payload);
    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <Title title="Actualizar Material de Empaque" subtitle="Actualiza la información del material de empaque" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <PackingMaterialFormComponent register={register} errors={errors} />
                <CustomFilledButton type="submit" label="Guardar Cambios" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
