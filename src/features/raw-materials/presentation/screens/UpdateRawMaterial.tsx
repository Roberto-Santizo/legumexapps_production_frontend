import { CustomFilledButton, CustomForm, Loading, Title, useNotification } from "@/features/shared/shared";
import { RawMaterialFormComponent, rawMaterialProvider, type RawMaterialItemForm } from "@/features/raw-materials/raw-materials";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export function UpdateRawMaterial() {
    const { id } = useParams();
    const notification = useNotification();
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ['getRawMaterialItemByCode', id],
        queryFn: () => rawMaterialProvider.getRawMaterialItemByCode(id!)
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValues
    } = useForm<RawMaterialItemForm>();


    const { mutate, isPending } = useMutation({
        mutationFn: (payload: RawMaterialItemForm) => rawMaterialProvider.updateRawMaterialItemByCode(id!, payload),
        onSuccess: (message) => {
            notification.success(message);
            navigate('/items-materia-prima');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    useEffect(() => {
        if (data) {
            const { id, ...rest } = data;
            setValues(rest);
        }
    }, [data]);


    const onSubmit = (payload: RawMaterialItemForm) => mutate(payload);
    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <Title title="Actualizar Materia Prima" subtitle="Actualiza la información de la materia prima" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <RawMaterialFormComponent register={register} errors={errors} />
                <CustomFilledButton type="submit" label="Guardar Cambios" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
