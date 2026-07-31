import { CustomFilledButton, CustomForm, Loading, Title, useNotification } from "@/features/shared/shared";
import { PackingMaterialTransactionUpdateFormComponent, packingMaterialTransactionProvider, type PackingMaterialTransactionUpdateForm } from "@/features/packing-material-transactions/packing-material-transactions";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export function UpdatePackingMaterialTransaction() {
    const { id } = useParams();
    const notification = useNotification();
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ['getPackingMaterialTransactionById', id],
        queryFn: () => packingMaterialTransactionProvider.getPackingMaterialTransactionById(id!)
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValues
    } = useForm<PackingMaterialTransactionUpdateForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: PackingMaterialTransactionUpdateForm) => packingMaterialTransactionProvider.updatePackingMaterialTransactionById(id!, payload),
        onSuccess: (message) => {
            notification.success(message);
            navigate('/material-empaque-transacciones');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    useEffect(() => {
        if (data) {
            const { id, user_name, ...rest } = data;
            setValues(rest);
        }
    }, [data]);

    const onSubmit = (payload: PackingMaterialTransactionUpdateForm) => mutate(payload);
    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <Title title="Actualizar Transacción de Material de Empaque" subtitle="Actualiza la información de la transacción de material de empaque" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <PackingMaterialTransactionUpdateFormComponent register={register} errors={errors} />
                <CustomFilledButton type="submit" label="Guardar Cambios" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
