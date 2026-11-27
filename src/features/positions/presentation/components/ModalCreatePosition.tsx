import { CustomFilledButton, CustomForm, Modal } from "@/features/shared/shared";
import { PositionFormComponent, useCreatePosition, type PositionForm } from "@/features/positions/positions";
import { useForm } from "react-hook-form";

type Props = {
    open: boolean;
    close: () => void;
    lineSkuId: number;
}

export function ModalCreatePosition({ open, close, lineSkuId }: Props) {
    const {
        handleSubmit,
        register,
        control,
        reset,
        formState: { errors }
    } = useForm<PositionForm>();

    const handleClose = () => {
        reset();
        close();
    };

    const { createPosition, isCreating } = useCreatePosition({ lineSkuId, onSuccess: handleClose });

    const onSubmit = (form: PositionForm) => createPosition(form);

    return (
        <Modal modal={open} closeModal={handleClose} title="Crear posición" width="sm:max-w-lg">
            <CustomForm onSubmit={handleSubmit(onSubmit)} className="border-none p-0 shadow-none">
                <PositionFormComponent register={register} errors={errors} control={control} lineSkuId={lineSkuId} />
                <CustomFilledButton type="submit" label="Crear posición" disabled={isCreating} fullWitdh />
            </CustomForm>
        </Modal>
    )
}
