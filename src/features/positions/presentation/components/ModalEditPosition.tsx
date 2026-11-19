import { CustomFilledButton, CustomForm, Modal } from "@/features/shared/shared";
import { PositionFormComponent, toPositionForm, usePositionById, useUpdatePosition, type PositionForm } from "@/features/positions/positions";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type Props = {
    id: string;
    close: () => void;
    lineId: number;
    lineCode: string;
}

export function ModalEditPosition({ id, close, lineId, lineCode }: Props) {
    const { data, isLoading, isError, error } = usePositionById(id);
    const { updatePosition, isUpdating } = useUpdatePosition({ lineId, lineCode, onSuccess: close });

    const {
        handleSubmit,
        register,
        control,
        reset,
        formState: { errors }
    } = useForm<PositionForm>();

    useEffect(() => {
        if (data) reset(toPositionForm(data));
    }, [data, reset]);

    const onSubmit = (form: PositionForm) => updatePosition(id, form);

    return (
        <Modal modal={id !== ''} closeModal={close} title="Editar posición" width="sm:max-w-lg">
            {isLoading && <div className="h-40 animate-pulse rounded-xl bg-canvas motion-reduce:animate-none" />}

            {isError && <p className="text-sm text-red-500">{error.message}</p>}

            {data && (
                <CustomForm onSubmit={handleSubmit(onSubmit)} className="border-none p-0 shadow-none">
                    <PositionFormComponent register={register} errors={errors} control={control} lineCode={lineCode} />
                    <CustomFilledButton type="submit" label="Guardar cambios" disabled={isUpdating} fullWitdh />
                </CustomForm>
            )}
        </Modal>
    )
}
