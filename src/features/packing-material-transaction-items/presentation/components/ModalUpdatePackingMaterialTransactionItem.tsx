import { CustomFilledButton, CustomForm, Modal, useNotification } from "@/features/shared/shared";
import { PackingMaterialTransactionItemFormComponent, packingMaterialTransactionItemProvider, type PackingMaterialTransactionItemForm, type PackingMaterialTransactionItemPayload } from "@/features/packing-material-transaction-items/packing-material-transaction-items";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";

type Props = {
    modal: boolean;
    closeModal: () => void;
    refetch: () => void;
    itemId: string;
}

export function ModalUpdatePackingMaterialTransactionItem({ modal, closeModal, refetch, itemId }: Props) {
    const notification = useNotification();

    const { data } = useQuery({
        queryKey: ['getPackingMaterialTransactionItemById', itemId],
        queryFn: () => packingMaterialTransactionItemProvider.getPackingMaterialTransactionItemById(itemId),
        enabled: !!itemId
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValues
    } = useForm<PackingMaterialTransactionItemForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: PackingMaterialTransactionItemPayload) => packingMaterialTransactionItemProvider.updatePackingMaterialTransactionItemById(itemId, payload),
        onSuccess: (message) => {
            notification.success(message);
            closeModal();
            refetch();
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
        pm_transaction_id: data!.pm_transaction_id
    });

    return (
        <Modal modal={modal} closeModal={closeModal} title="Editar Item">
            {data && (
                <CustomForm onSubmit={handleSubmit(onSubmit)}>
                    <PackingMaterialTransactionItemFormComponent register={register} errors={errors} />
                    <CustomFilledButton type="submit" label="Guardar Cambios" disabled={isPending} />
                </CustomForm>
            )}
        </Modal>
    )
}
