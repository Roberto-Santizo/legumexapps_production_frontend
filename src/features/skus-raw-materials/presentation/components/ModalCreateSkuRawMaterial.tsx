import { CustomFilledButton, CustomForm, Modal, useNotification } from "@/features/shared/shared";
import { SkuRawMaterialFormComponent, skuRawMaterialProvider, type SkuRawMaterialForm } from "@/features/skus-raw-materials/skus-raw-materials";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

type Props = {
    modal: boolean;
    closeModal: () => void;
    refetch: () => void;
}

export function ModalCreateSkuRawMaterial({ modal, closeModal, refetch }: Props) {
    const notification = useNotification();
    const { id } = useParams();

    const {
        handleSubmit,
        register,
        control,
        reset,
        formState: { errors }
    } = useForm<SkuRawMaterialForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: SkuRawMaterialForm) => skuRawMaterialProvider.createSkuRawMaterial(payload),
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

    const onSubmit = (payload: SkuRawMaterialForm) => {
        payload.stock_keeping_unit_code = id!;
        mutate(payload);
    }

    return (
        <Modal modal={modal} closeModal={closeModal} title="Agregar Item">
            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <SkuRawMaterialFormComponent register={register} errors={errors} control={control} />
                <CustomFilledButton type="submit" label="Crear" disabled={isPending} />
            </CustomForm>
        </Modal>
    )
}
