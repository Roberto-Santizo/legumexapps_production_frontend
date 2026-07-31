import { CustomFilledButton, CustomForm, Title, useNotification } from "@/features/shared/shared";
import { PackingMaterialTransactionItemFormComponent, packingMaterialTransactionItemProvider, type PackingMaterialTransactionItemForm, type PackingMaterialTransactionItemPayload } from "@/features/packing-material-transaction-items/packing-material-transaction-items";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function CreatePackingMaterialTransactionItem() {
    const { pm_transaction_id } = useParams();
    const notification = useNotification();

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors }
    } = useForm<PackingMaterialTransactionItemForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: PackingMaterialTransactionItemPayload) => packingMaterialTransactionItemProvider.createPackingMaterialTransactionItem(payload),
        onSuccess: (message) => {
            notification.success(message);
            reset();
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const onSubmit = (payload: PackingMaterialTransactionItemForm) => mutate({
        ...payload,
        pm_transaction_id: Number(pm_transaction_id)
    });

    return (
        <div className="space-y-5">
            <Title title="Crear Item de Transacción" subtitle="Registra un nuevo item de la transacción de material de empaque" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <PackingMaterialTransactionItemFormComponent register={register} errors={errors} />
                <CustomFilledButton type="submit" label="Crear" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
