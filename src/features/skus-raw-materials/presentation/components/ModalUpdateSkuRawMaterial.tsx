import { CustomFilledButton, CustomForm, Modal, useNotification } from "@/features/shared/shared";
import { SkuRawMaterialFormComponent, skuRawMaterialProvider, type SkuRawMaterialForm } from "@/features/skus-raw-materials/skus-raw-materials";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

type Props = {
    modal: boolean;
    closeModal: () => void;
    refetch: () => void;
    itemId: string;
}

export function ModalUpdateSkuRawMaterial({ modal, closeModal, refetch, itemId }: Props) {
    const notification = useNotification();
    const { id } = useParams();

    const { data } = useQuery({
        queryKey: ['getSkuRawMaterialById', itemId],
        queryFn: () => skuRawMaterialProvider.getSkuRawMaterialById(itemId),
        enabled: !!itemId
    });

    const {
        handleSubmit,
        register,
        control,
        setValues,
        formState: { errors }
    } = useForm<SkuRawMaterialForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: SkuRawMaterialForm) => skuRawMaterialProvider.updateSkuRawMaterialById(itemId, payload),
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
            const { id, sku, raw_material, ...rest } = data;
            setValues(rest);
        }
    }, [data]);

    const onSubmit = (payload: SkuRawMaterialForm) => {
        payload.stock_keeping_unit_code = id!;
        mutate(payload);
    }

    return (
        <Modal modal={modal} closeModal={closeModal} title="Editar Item">
            {data && (
                <CustomForm onSubmit={handleSubmit(onSubmit)}>
                    <SkuRawMaterialFormComponent register={register} errors={errors} control={control} />
                    <CustomFilledButton type="submit" label="Guardar Cambios" disabled={isPending} />
                </CustomForm>
            )}
        </Modal>
    )
}
