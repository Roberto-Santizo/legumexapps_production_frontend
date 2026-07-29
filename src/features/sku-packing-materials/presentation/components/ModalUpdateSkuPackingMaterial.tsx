import { CustomFilledButton, CustomForm, Modal, useNotification } from "@/features/shared/shared";
import { SkuPackingMaterialFormComponent, skuPackingMaterialProvider, type SkuPackingMaterialForm } from "@/features/sku-packing-materials/sku-packing-materials";
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

export function ModalUpdateSkuPackingMaterial({ modal, closeModal, refetch, itemId }: Props) {
    const notification = useNotification();
    const { id } = useParams();


    const { data } = useQuery({
        queryKey: ['getSkuPackingMaterialById', itemId],
        queryFn: () => skuPackingMaterialProvider.getSkuPackingMaterialById(itemId)
    });

    const {
        handleSubmit,
        register,
        control,
        setValues,
        formState: { errors }
    } = useForm<SkuPackingMaterialForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: SkuPackingMaterialForm) => skuPackingMaterialProvider.updateSkuPackingMaterialById(itemId, payload),
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
            const { id, sku, packing_material, ...rest } = data;
            setValues(rest);
        }
    }, [data]);

    const onSubmit = (payload: SkuPackingMaterialForm) => {
        payload.sku_code = id!;
        mutate(payload);
    }

    if (data) return (
        <Modal modal={modal} closeModal={closeModal} title="Editar Item">
            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <SkuPackingMaterialFormComponent register={register} errors={errors} control={control} />
                <CustomFilledButton type="submit" label="Guardar Cambios" disabled={isPending} />
            </CustomForm>
        </Modal>
    )
}
