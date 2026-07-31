import { CustomFilledButton, CustomForm, Title, useNotification } from "@/features/shared/shared";
import { PackingMaterialTransactionFormComponent, packingMaterialTransactionProvider, type PackingMaterialTransactionCreateForm } from "@/features/packing-material-transactions/packing-material-transactions";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const emptyItem = { quantity: 0, lote: "", destination: "", packing_material_id: 0 };

export function CreatePackingMaterialTransaction() {
    const notification = useNotification();
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        control,
        formState: { errors }
    } = useForm<PackingMaterialTransactionCreateForm>({
        defaultValues: { items: [emptyItem] }
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: PackingMaterialTransactionCreateForm) => packingMaterialTransactionProvider.createPackingMaterialTransaction(payload),
        onSuccess: (message) => {
            notification.success(message);
            navigate('/material-empaque-transacciones');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const onSubmit = (payload: PackingMaterialTransactionCreateForm) => mutate(payload);
    return (
        <div className="space-y-5">
            <Title title="Crear Transacción de Material de Empaque" subtitle="Registra una nueva transacción de material de empaque" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <PackingMaterialTransactionFormComponent register={register} errors={errors} control={control} />
                <CustomFilledButton type="submit" label="Crear" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
