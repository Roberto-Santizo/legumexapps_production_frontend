import { CustomFilledButton, CustomForm, Modal, useNotification } from "@/features/shared/shared";
import { SkuPackingMaterialFormComponent, skuPackingMaterialProvider, type SkuPackingMaterialForm } from "@/features/sku-packing-materials/sku-packing-materials";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

type Props = {
    modal: boolean;
    closeModal: () => void;
    refetch: () => void;
}

export function ModalCreateSkuPackingMaterial({ modal, closeModal, refetch }: Props) {
    const notification = useNotification();
    const { id } = useParams();

    const {
        handleSubmit,
        register,
        control,
        reset,
        formState: { errors }
    } = useForm<SkuPackingMaterialForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: SkuPackingMaterialForm) => skuPackingMaterialProvider.createSkuPackingMaterial(payload),
        onSuccess: (message) => {
            notification.success(message);
            reset();
            closeModal();
            refetch();
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const onSubmit = (payload: SkuPackingMaterialForm) => {
        payload.sku_code = id!;
        mutate(payload);
    }

    return (
        <Modal modal={modal} closeModal={closeModal} title="Agregar Item">
            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <SkuPackingMaterialFormComponent register={register} errors={errors} control={control} />
                <CustomFilledButton type="submit" label="Crear" disabled={isPending} />
            </CustomForm>
        </Modal>
    )
}
