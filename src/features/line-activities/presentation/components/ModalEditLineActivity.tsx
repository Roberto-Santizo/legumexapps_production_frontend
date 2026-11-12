import { CustomFilledButton, CustomForm, getQueryParam, handleDeleteQueryParam, Modal, queryParamExists } from "@/features/shared/shared";
import { LineActivityQuantityField, useUpdateLineActivity, type LineActivity, type LineActivityQuantityForm } from "@/features/line-activities/line-activities";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
    lineCode: string;
    activities: LineActivity[];
}

export function ModalEditLineActivity({ lineCode, activities }: Props) {
    const location = useLocation();
    const navigate = useNavigate();
    const itemId = getQueryParam(location, 'editLineActivity') ?? '';
    const show = queryParamExists(location, 'editLineActivity');
    const item = activities.find(activity => `${activity.id}` === itemId) ?? null;

    const closeModal = () => handleDeleteQueryParam(location, navigate, 'editLineActivity');

    const { updateQuantity, isUpdating } = useUpdateLineActivity({ lineCode, onSuccess: closeModal });

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors }
    } = useForm<LineActivityQuantityForm>();

    useEffect(() => {
        if (show && item) reset({ quantity: item.quantity });
    }, [show, item, reset]);

    const onSubmit = (form: LineActivityQuantityForm) => {
        if (item) updateQuantity(item.id, form.quantity);
    };

    return (
        <Modal modal={show && Boolean(item)} closeModal={closeModal} title="Cambiar cantidad" width="sm:max-w-md">
            {item && (
                <div className="space-y-5">
                    <div className="rounded-xl border border-line bg-surface px-4 py-3">
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">Actividad</p>
                        <p className="mt-0.5 text-sm text-ink">{item.activity} <span className="font-mono text-xs text-ink-subtle">· {item.unit}</span></p>
                    </div>

                    <CustomForm onSubmit={handleSubmit(onSubmit)} className="border-none p-0 shadow-none">
                        <LineActivityQuantityField<LineActivityQuantityForm>
                            register={register}
                            errorMessage={errors.quantity?.message}
                        />
                        <p className="text-xs text-ink-muted">Para cambiar de actividad, quítala de la línea y asigna la otra.</p>
                        <CustomFilledButton type="submit" label="Guardar cambios" disabled={isUpdating} fullWitdh />
                    </CustomForm>
                </div>
            )}
        </Modal>
    )
}
