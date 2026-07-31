import { CustomFilledButton, CustomForm, Loading, Title, useNotification } from "@/features/shared/shared";
import { PackingMaterialTransactionItemFormComponent, packingMaterialTransactionItemProvider, type PackingMaterialTransactionItemForm, type PackingMaterialTransactionItemPayload } from "@/features/packing-material-transaction-items/packing-material-transaction-items";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function UpdatePackingMaterialTransactionItem() {
    const { id, pm_transaction_id } = useParams();
    const notification = useNotification();

    const { data, isLoading } = useQuery({
        queryKey: ['getPackingMaterialTransactionItemById', id],
        queryFn: () => packingMaterialTransactionItemProvider.getPackingMaterialTransactionItemById(id!)
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValues
    } = useForm<PackingMaterialTransactionItemForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: PackingMaterialTransactionItemPayload) => packingMaterialTransactionItemProvider.updatePackingMaterialTransactionItemById(id!, payload),
        onSuccess: (message) => {
            notification.success(message);
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    useEffect(() => {
        if (data) {
            setValues({
                quantity: data.quantity,
                lote: data.lote,
                destination: data.destination ?? '',
                packing_material_id: data.packing_material_id
            });
        }
    }, [data]);

    const onSubmit = (payload: PackingMaterialTransactionItemForm) => mutate({
        ...payload,
        pm_transaction_id: Number(pm_transaction_id ?? data?.pm_transaction_id)
    });

    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <Title title="Actualizar Item de Transacción" subtitle="Actualiza la información del item de la transacción de material de empaque" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <PackingMaterialTransactionItemFormComponent register={register} errors={errors} />
                <CustomFilledButton type="submit" label="Guardar Cambios" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
